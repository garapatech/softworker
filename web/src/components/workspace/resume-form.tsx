import { SectionList } from '@/components/workspace/sections/section-list'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function ResumeForm() {
  const resume = useResumeStore((state) => state.resumeDraft)
  const validationErrors = useResumeStore((state) => state.validationState.byPath)
  const updateField = useResumeStore((state) => state.updateField)
  const addArrayItem = useResumeStore((state) => state.addArrayItem)
  const removeArrayItem = useResumeStore((state) => state.removeArrayItem)
  const openSections = useFormStore((state) => state.openSections)
  const onToggle = useFormStore((state) => state.toggleSection)
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)

  function onChange(...args: Parameters<typeof updateField>) {
    updateField(...args)
    clearJsonStatus()
  }

  function onAdd(...args: Parameters<typeof addArrayItem>) {
    addArrayItem(...args)
    clearJsonStatus()
  }

  function onRemove(...args: Parameters<typeof removeArrayItem>) {
    removeArrayItem(...args)
    clearJsonStatus()
  }

  return (
    <div className="grid gap-3 overflow-auto p-4">
      <SectionList
        resume={resume}
        openSections={openSections}
        onToggle={onToggle}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        validationErrors={validationErrors}
      />
    </div>
  )
}
