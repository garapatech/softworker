import Handlebars from 'handlebars'
import jsonata from 'jsonata'
import rawDefaultResume from '@docs/examples/resume.json?raw'
import rawI18n from '@template/i18n.json?raw'
import rawTemplate from '@template/index.hbs?raw'
import rawTransform from '@template/resume.jsonata?raw'
import rawStyle from '@template/style.css?raw'
import type { JsonObject } from '@/services/resume.service'

const partialFiles = import.meta.glob('@template/**/*.hbs', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const translations = JSON.parse(rawI18n) as Record<string, JsonObject>
const transformExpression = jsonata(rawTransform)
const template = Handlebars.compile(rawTemplate)

for (const [path, source] of Object.entries(partialFiles)) {
  const name = path.replace(/^.*\/template\//, '').replace(/\.hbs$/, '')

  if (name === 'index') {
    continue
  }

  Handlebars.registerPartial(name, source)
}

export const DEFAULT_LANGUAGE = 'pt_BR'

export const JSON_DOWNLOAD_FILENAME = 'curriculo.json'

export const PREVIEW_LANGUAGES = [
  { value: 'pt_BR', label: 'Português (Brasil)' },
  { value: 'en_US', label: 'English (US)' },
] as const

export type ResumeLanguage = (typeof PREVIEW_LANGUAGES)[number]['value']

export const DEFAULT_RESUME = JSON.parse(rawDefaultResume) as JsonObject

export async function renderResumeDocument(resume: JsonObject, language: ResumeLanguage) {
  const i18n = translations[language] ?? translations[DEFAULT_LANGUAGE]
  const context = (await transformExpression.evaluate({
    i18n,
    resume,
  })) as JsonObject

  return template({
    ...context,
    css: rawStyle,
  })
}
