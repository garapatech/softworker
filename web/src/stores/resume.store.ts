import type { ValidationState } from '@/mappers/resume.mapper'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
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
  DEFAULT_LANGUAGE,
  DEFAULT_RESUME,
  JSON_DOWNLOAD_FILENAME,
  renderResumeDocument,
  type ResumeLanguage,
} from '@/services/preview.service'

function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

interface ResumeState {
  resumeDraft: JsonObject
  language: ResumeLanguage
  validationState: ValidationState
  previewHtml: string
  previewStatusMessage: string
  setLanguage: (language: ResumeLanguage) => void
  setResumeDraft: (next: JsonObject) => void
  updateField: (path: PathPart[], value: JsonValue) => void
  addArrayItem: (path: string[], item: JsonObject) => void
  removeArrayItem: (path: string[], index: number) => void
  renderPreview: () => Promise<void>
  downloadJson: () => void
}

const initialResume = DEFAULT_RESUME

export const useResumeStore = create<ResumeState>()(
  immer((set, get) => ({
    resumeDraft: initialResume,
    language: DEFAULT_LANGUAGE,
    validationState: validateResume(initialResume),
    previewHtml: '',
    previewStatusMessage: '',

    setLanguage: (language) => {
      set(() => ({
        language,
      }))
    },

    setResumeDraft: (next) => {
      set(() => ({
        resumeDraft: next,
        validationState: validateResume(next),
      }))
    },

    updateField: (path, value) => {
      const next = setAtPath(get().resumeDraft, path, value)

      set(() => ({
        resumeDraft: next,
        validationState: validateResume(next),
      }))
    },

    addArrayItem: (path, item) => {
      const next = insertArrayItem(get().resumeDraft, path, item)

      set(() => ({
        resumeDraft: next,
        validationState: validateResume(next),
      }))
    },

    removeArrayItem: (path, index) => {
      const next = removeArrayItem(get().resumeDraft, path, index)

      set(() => ({
        resumeDraft: next,
        validationState: validateResume(next),
      }))
    },

    renderPreview: async () => {
      const { language, resumeDraft } = get()

      try {
        const html = await renderResumeDocument(resumeDraft, language)

        set(() => ({
          previewHtml: html,
          previewStatusMessage: '',
        }))
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Falha ao renderizar a pré-visualização.'

        set(() => ({
          previewStatusMessage: message,
        }))
      }
    },

    downloadJson: () => {
      const { resumeDraft } = get()
      downloadTextFile(JSON_DOWNLOAD_FILENAME, formatJson(resumeDraft), 'application/json;charset=utf-8')
    },
  })),
)
