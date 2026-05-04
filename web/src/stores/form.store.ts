import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { formatJson, type JsonObject } from '@/services/resume.service'
import { loadWorkspacePersistence } from '@/services/workspace-persistence.service'

enableMapSet()

export type EditorMode = 'form' | 'source'

const initialWorkspace = loadWorkspacePersistence()

interface FormState {
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

    setMode: (mode) => {
      set((state) => {
        state.mode = mode
      })
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

    setJsonDraft: (value) => {
      set((state) => {
        state.jsonDraft = value
      })
    },

    setJsonStatusMessage: (message) => {
      set((state) => {
        state.jsonStatusMessage = message
      })
    },

    clearJsonStatus: () => {
      set((state) => {
        state.jsonStatusMessage = ''
      })
    },
  })),
)
