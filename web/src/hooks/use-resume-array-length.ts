import { useResumeStore } from '@/stores/resume.store'
import { getAtPath, type PathPart } from '@/services/resume.service'

export function useResumeArrayLength(path: PathPart[]) {
  return useResumeStore((state) => {
    const value = getAtPath(state.resumeDraft, path)
    return Array.isArray(value) ? value.length : 0
  })
}
