import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { formatJson, type JsonObject } from '@/services/resume.service'
import { loadWorkspacePersistence } from '@/services/workspace-persistence.service'

enableMapSet()

export type EditorMode = 'form' | 'source'

const initialWorkspace = loadWorkspacePersistence()

export interface FormState {
  mode: EditorMode
  jsonDraft: string
  jsonStatusMessage: string
  openSections: Set<string>
  setMode: (mode: EditorMode) => void
  toggleSection: (key: string, open: boolean) => void
  syncJsonDraftFromResume: (resumeDraft: JsonObject) => void
  setJsonDraft: (value: string) => void
  setJsonStatusMessage: (message: string) => void
  clearJsonStatus: () => void
}

export const useFormStore = create<FormState>()(
  immer((set) => ({
    mode: initialWorkspace.mode,
    jsonDraft: initialWorkspace.jsonDraft,
    jsonStatusMessage: '',
    openSections: new Set<string>(),

    setMode: (mode: EditorMode): void => {
      set((state) => {
        state.mode = mode
      })
    },

    toggleSection: (key: string, open: boolean): void => {
      set((state) => {
        if (open) {
          state.openSections.add(key)
        } else {
          state.openSections.delete(key)
        }
      })
    },

    syncJsonDraftFromResume: (resumeDraft: JsonObject): void => {
      set((state) => {
        state.jsonDraft = formatJson(resumeDraft)
      })
    },

    setJsonDraft: (value: string): void => {
      set((state) => {
        state.jsonDraft = value
      })
    },

    setJsonStatusMessage: (message: string): void => {
      set((state) => {
        state.jsonStatusMessage = message
      })
    },

    clearJsonStatus: (): void => {
      set((state) => {
        state.jsonStatusMessage = ''
      })
    },
  })),
)
