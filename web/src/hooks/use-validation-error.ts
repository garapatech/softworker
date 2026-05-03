import { useResumeStore } from '@/stores/resume.store'

export function useValidationError(pathKey: string) {
  return useResumeStore((state) => state.validationState.byPath[pathKey]?.[0])
}
