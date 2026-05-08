import Handlebars from 'handlebars'
import jsonata from 'jsonata'
import rawDefaultResume from '@docs/examples/resume.json?raw'
import rawI18n from '@template/i18n.json?raw'
import rawTemplate from '@template/index.hbs?raw'
import rawTransform from '@template/resume.jsonata?raw'
import rawStyle from '@template/style.css?raw'
import type { JsonObject } from '@/services/resume.service'

export const DEFAULT_LANGUAGE = 'pt_BR'
export const JSON_DOWNLOAD_FILENAME = 'curriculo.json'

export const PREVIEW_LANGUAGES = [
  { value: 'pt_BR', label: 'Português (Brasil)' },
  { value: 'en_US', label: 'English (US)' },
] as const

export type ResumeLanguage = (typeof PREVIEW_LANGUAGES)[number]['value']

export const DEFAULT_RESUME = JSON.parse(rawDefaultResume) as JsonObject

const partialFiles = import.meta.glob('@template/**/*.hbs', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const previewTranslations = JSON.parse(rawI18n) as Record<string, JsonObject>
const resumeTransformExpression = jsonata(rawTransform)

function registerPreviewPartials(files: Record<string, string>): void {
  for (const [path, source] of Object.entries(files)) {
    const name = path.replace(/^.*\/template\//, '').replace(/\.hbs$/, '')

    if (name === 'index') {
      continue
    }

    Handlebars.registerPartial(name, source)
  }
}

registerPreviewPartials(partialFiles)

const resumeTemplate = Handlebars.compile(rawTemplate)

function resolveTranslations(language: ResumeLanguage): JsonObject {
  return previewTranslations[language] ?? previewTranslations[DEFAULT_LANGUAGE]
}

export async function renderResumeDocument(resume: JsonObject, language: ResumeLanguage): Promise<string> {
  const i18n = resolveTranslations(language)
  const context = (await resumeTransformExpression.evaluate({
    i18n,
    resume,
  })) as JsonObject

  return resumeTemplate({
    ...context,
    css: rawStyle,
  })
}
