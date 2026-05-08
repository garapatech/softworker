import Handlebars from 'handlebars'
import jsonata from 'jsonata'
import rawDefaultResume from '@docs/examples/resume.json?raw'
import rawI18n from '@template/i18n.json?raw'
import rawTemplate from '@template/index.hbs?raw'
import rawTransform from '@template/resume.jsonata?raw'
import rawStyle from '@template/style.css?raw'
import { isJsonRecord, parseJsonObject, type JsonObject } from '@/services/resume.service'

export const DEFAULT_LANGUAGE = 'pt_BR'
export const JSON_DOWNLOAD_FILENAME = 'curriculo.json'

export const PREVIEW_LANGUAGES = [
  { value: 'pt_BR', label: 'Português (Brasil)' },
  { value: 'en_US', label: 'English (US)' },
] as const

export type ResumeLanguage = (typeof PREVIEW_LANGUAGES)[number]['value']

function parseJsonObjectRecord(source: string, label: string): Record<string, JsonObject> {
  const parsed = parseJsonObject(source, `${label} must be a JSON object.`)

  const result: Record<string, JsonObject> = {}

  for (const [key, value] of Object.entries(parsed)) {
    if (!isJsonRecord(value)) {
      throw new Error(`${label} entries must be JSON objects.`)
    }

    result[key] = value
  }

  return result
}

export const DEFAULT_RESUME = parseJsonObject(rawDefaultResume, 'Default resume must be a JSON object.')

const partialFiles = import.meta.glob<string>('@template/**/*.hbs', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const previewTranslations = parseJsonObjectRecord(rawI18n, 'Preview translations')
const resumeTransformExpression = jsonata(rawTransform)

for (const [path, source] of Object.entries(partialFiles)) {
  const name = path.replace(/^.*\/template\//, '').replace(/\.hbs$/, '')

  if (name !== 'index') {
    Handlebars.registerPartial(name, source)
  }
}

const resumeTemplate = Handlebars.compile(rawTemplate)

export async function renderResumeDocument(resume: JsonObject, language: ResumeLanguage): Promise<string> {
  const i18n = previewTranslations[language] ?? previewTranslations[DEFAULT_LANGUAGE]
  const context = await resumeTransformExpression.evaluate({
    i18n,
    resume,
  })

  if (!isJsonRecord(context)) {
    throw new Error('Resume transform must return a JSON object.')
  }

  return resumeTemplate({
    ...context,
    css: rawStyle,
  })
}
