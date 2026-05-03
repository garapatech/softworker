import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/stores/resume.store'

export function useStatusAlert() {
  return useResumeStore(
    useShallow((state) => ({
      message: state.previewStatusMessage,
      validationIssues: state.validationState.issues,
    })),
  )
}
