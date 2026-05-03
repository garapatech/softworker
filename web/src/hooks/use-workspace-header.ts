import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/stores/resume.store'

export function useWorkspaceHeader() {
  return useResumeStore(
    useShallow((state) => ({
      language: state.language,
      setLanguage: state.setLanguage,
    })),
  )
}
