import { useResumeStore } from '@/stores/resume.store'

export function useValidationIssueCount(pathKey: string) {
  return useResumeStore((state) => state.validationIssueCounts[pathKey] ?? 0)
}
