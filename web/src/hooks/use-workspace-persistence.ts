import { useEffect } from 'react'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import { saveWorkspacePersistence } from '@/services/workspace-persistence.service'

function persistCurrentWorkspace() {
  saveWorkspacePersistence({
    jsonDraft: useFormStore.getState().jsonDraft,
    language: useResumeStore.getState().language,
    mode: useFormStore.getState().mode,
    resumeDraft: useResumeStore.getState().resumeDraft,
  })
}

export function WorkspacePersistenceSync() {
  useEffect(() => {
    persistCurrentWorkspace()

    const unsubscribeResume = useResumeStore.subscribe((state, previousState) => {
      if (state.resumeDraft === previousState.resumeDraft && state.language === previousState.language) {
        return
      }

      persistCurrentWorkspace()
    })

    const unsubscribeForm = useFormStore.subscribe((state, previousState) => {
      if (state.jsonDraft === previousState.jsonDraft && state.mode === previousState.mode) {
        return
      }

      persistCurrentWorkspace()
    })

    return () => {
      unsubscribeResume()
      unsubscribeForm()
    }
  }, [])

  return null
}
