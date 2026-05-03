import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import type { JsonObject } from '@/services/resume.service'

export function useArraySectionActions() {
  const addArrayItem = useResumeStore((state) => state.addArrayItem)
  const removeArrayItem = useResumeStore((state) => state.removeArrayItem)
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)

  return {
    onAdd: (path: string[], item: JsonObject) => {
      addArrayItem(path, item)
      clearJsonStatus()
    },
    onRemove: (path: string[], index: number) => {
      removeArrayItem(path, index)
      clearJsonStatus()
    },
  }
}
