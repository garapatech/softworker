import { useShallow } from 'zustand/react/shallow'
import { useFormStore, type EditorMode } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useWorkspaceMode() {
  const { mode, setMode, syncJsonDraftFromResume } = useFormStore(
    useShallow((state) => ({
      mode: state.mode,
      setMode: state.setMode,
      syncJsonDraftFromResume: state.syncJsonDraftFromResume,
    })),
  )

  return {
    mode,
    setMode: (nextMode: EditorMode) => {
      setMode(nextMode)

      if (nextMode === 'source') {
        syncJsonDraftFromResume(useResumeStore.getState().resumeDraft)
      }
    },
  }
}
