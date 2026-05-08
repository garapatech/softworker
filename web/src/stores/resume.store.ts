import type { ValidationState } from '@/mappers/resume.mapper'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { buildValidationIssueCounts, type ValidationIssueCounts } from '@/services/resume-form.service'
import {
  formatJson,
  insertArrayItem,
  removeArrayItem,
  setAtPath,
  validateResume,
  type JsonObject,
  type JsonValue,
  type PathPart,
} from '@/services/resume.service'
import {
  JSON_DOWNLOAD_FILENAME,
  DEFAULT_LANGUAGE,
  DEFAULT_RESUME,
  renderResumeDocument,
  type ResumeLanguage,
} from '@/services/preview.service'
import { initialWorkspacePersistence } from '@/services/workspace-persistence.service'

function downloadTextFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export interface ResumeState {
  resumeDraft: JsonObject
  language: ResumeLanguage
  validationState: ValidationState
  validationIssueCounts: ValidationIssueCounts
  previewHtml: string
  previewStatusMessage: string
  setLanguage: (language: ResumeLanguage) => void
  setResumeDraft: (next: JsonObject) => void
  resetToDefaults: () => void
  updateField: (path: PathPart[], value: JsonValue) => void
  addArrayItem: (path: string[], item: JsonObject) => void
  removeArrayItem: (path: string[], index: number) => void
  renderPreview: () => Promise<void>
  downloadJson: () => void
}

const initialResume = initialWorkspacePersistence.resumeDraft

function buildValidatedResumeState(resumeDraft: JsonObject, language: ResumeLanguage): {
  validationIssueCounts: ValidationIssueCounts
  validationState: ValidationState
} {
  const validationState = validateResume(resumeDraft, language)

  return {
    validationIssueCounts: buildValidationIssueCounts(validationState.byPath),
    validationState,
  }
}

export const useResumeStore = create<ResumeState>()(
  immer((set, get) => {
    const commitResumeDraft = (resumeDraft: JsonObject): void => {
      const { validationIssueCounts, validationState } = buildValidatedResumeState(resumeDraft, get().language)

      set(() => ({
        resumeDraft,
        validationState,
        validationIssueCounts,
      }))
    }

    const updateResumeDraft = (transform: (resumeDraft: JsonObject) => JsonObject): void => {
      commitResumeDraft(transform(get().resumeDraft))
    }

    return {
      resumeDraft: initialResume,
      language: initialWorkspacePersistence.language,
      ...buildValidatedResumeState(initialResume, initialWorkspacePersistence.language),
      previewHtml: '',
      previewStatusMessage: '',

      setLanguage: (language: ResumeLanguage): void => {
        const resumeDraft = get().resumeDraft
        const { validationIssueCounts, validationState } = buildValidatedResumeState(resumeDraft, language)

        set(() => ({
          language,
          validationState,
          validationIssueCounts,
        }))
      },

      setResumeDraft: (next: JsonObject): void => {
        commitResumeDraft(next)
      },

      resetToDefaults: (): void => {
        const { validationIssueCounts, validationState } = buildValidatedResumeState(DEFAULT_RESUME, DEFAULT_LANGUAGE)

        set(() => ({
          language: DEFAULT_LANGUAGE,
          previewHtml: '',
          previewStatusMessage: '',
          resumeDraft: DEFAULT_RESUME,
          validationIssueCounts,
          validationState,
        }))
      },

      updateField: (path: PathPart[], value: JsonValue): void => {
        updateResumeDraft((resumeDraft) => setAtPath(resumeDraft, path, value))
      },

      addArrayItem: (path: string[], item: JsonObject): void => {
        updateResumeDraft((resumeDraft) => insertArrayItem(resumeDraft, path, item))
      },

      removeArrayItem: (path: string[], index: number): void => {
        updateResumeDraft((resumeDraft) => removeArrayItem(resumeDraft, path, index))
      },

      renderPreview: async (): Promise<void> => {
        const { language, resumeDraft } = get()

        try {
          const html = await renderResumeDocument(resumeDraft, language)

          set(() => ({
            previewHtml: html,
            previewStatusMessage: '',
          }))
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : language === 'en_US'
                ? 'Failed to render the preview.'
                : 'Falha ao renderizar a pré-visualização.'

          set(() => ({
            previewStatusMessage: message,
          }))
        }
      },

      downloadJson: (): void => {
        const { resumeDraft } = get()
        downloadTextFile(JSON_DOWNLOAD_FILENAME, formatJson(resumeDraft), 'application/json;charset=utf-8')
      },
    }
  }),
)
