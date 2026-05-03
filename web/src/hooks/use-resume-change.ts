import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import type { JsonValue, PathPart } from '@/services/resume.service'

export function useResumeChange() {
  const updateField = useResumeStore((state) => state.updateField)
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)

  return (path: PathPart[], value: JsonValue) => {
    updateField(path, value)
    clearJsonStatus()
  }
}
