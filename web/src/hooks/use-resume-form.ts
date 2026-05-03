import { useShallow } from 'zustand/react/shallow'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useResumeForm() {
  const { addArrayItem, removeArrayItem, resumeDraft, updateField, validationErrors } = useResumeStore(
    useShallow((state) => ({
      addArrayItem: state.addArrayItem,
      removeArrayItem: state.removeArrayItem,
      resumeDraft: state.resumeDraft,
      updateField: state.updateField,
      validationErrors: state.validationState.byPath,
    })),
  )
  const { clearJsonStatus, openSections, toggleSection } = useFormStore(
    useShallow((state) => ({
      clearJsonStatus: state.clearJsonStatus,
      openSections: state.openSections,
      toggleSection: state.toggleSection,
    })),
  )

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

  return {
    onAdd,
    onChange,
    onRemove,
    onToggle: toggleSection,
    openSections,
    resume: resumeDraft,
    validationErrors,
  }
}
