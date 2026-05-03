import { useResumeStore } from '@/stores/resume.store'
import { getAtPath, type JsonValue, type PathPart } from '@/services/resume.service'

export function useResumeValue(path: PathPart[]): JsonValue | undefined {
  return useResumeStore((state) => getAtPath(state.resumeDraft, path))
}
