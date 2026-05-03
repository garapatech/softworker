import { useEffect } from 'react'
import { useResumeStore } from '@/stores/resume.store'

export function PreviewRenderSync() {
  useEffect(() => {
    void useResumeStore.getState().renderPreview()

    return useResumeStore.subscribe((state, previousState) => {
      if (state.language === previousState.language && state.resumeDraft === previousState.resumeDraft) {
        return
      }

      void state.renderPreview()
    })
  }, [])

  return null
}
