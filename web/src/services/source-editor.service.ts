import { parseResumeJson, type JsonObject } from '@/services/resume.service'
import type { ResumeLanguage } from '@/services/preview.service'

type ParseSourceDraftResult =
  | {
      errorMessage: null
      resumeDraft: JsonObject
    }
  | {
      errorMessage: string
      resumeDraft: null
    }

export function parseSourceDraft(value: string, language: ResumeLanguage): ParseSourceDraftResult {
  try {
    return {
      errorMessage: null,
      resumeDraft: parseResumeJson(value, language),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'JSON inválido.'

    return {
      errorMessage,
      resumeDraft: null,
    }
  }
}
