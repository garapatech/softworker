import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { formatJson, parseResumeJson, type JsonObject } from '@/services/resume.service'
import { DEFAULT_RESUME } from '@/services/preview.service'
import { useResumeStore } from '@/stores/resume.store'

enableMapSet()

export type EditorMode = 'form' | 'source'

interface FormState {
  mode: EditorMode
  jsonDraft: string
  jsonStatusMessage: string
  openSections: Set<string>
  setMode: (mode: EditorMode) => void
  toggleSection: (key: string, open: boolean) => void
  syncJsonDraftFromResume: (resumeDraft: JsonObject) => void
  applyJsonDraft: (value: string) => void
  clearJsonStatus: () => void
}

export const useFormStore = create<FormState>()(
  immer((set) => ({
    mode: 'form',
    jsonDraft: formatJson(DEFAULT_RESUME),
    jsonStatusMessage: '',
    openSections: new Set<string>(),

    setMode: (mode) => {
      set((state) => {
        state.mode = mode
      })

      if (mode === 'source') {
        useFormStore.getState().syncJsonDraftFromResume(useResumeStore.getState().resumeDraft)
      }
    },

    toggleSection: (key, open) => {
      set((state) => {
        if (open) {
          state.openSections.add(key)
        } else {
          state.openSections.delete(key)
        }
      })
    },

    syncJsonDraftFromResume: (resumeDraft) => {
      set((state) => {
        state.jsonDraft = formatJson(resumeDraft)
      })
    },

    applyJsonDraft: (value) => {
      set((state) => {
        state.jsonDraft = value
      })

      try {
        const nextResume = parseResumeJson(value)
        useResumeStore.getState().setResumeDraft(nextResume)

        set((state) => {
          state.jsonStatusMessage = ''
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'JSON inválido.'

        set((state) => {
          state.jsonStatusMessage = `JSON inválido: ${message}`
        })
      }
    },

    clearJsonStatus: () => {
      set((state) => {
        state.jsonStatusMessage = ''
      })
    },
  })),
)
