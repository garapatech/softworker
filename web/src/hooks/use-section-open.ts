import { useShallow } from 'zustand/react/shallow'
import { useFormStore } from '@/stores/form.store'

export function useSectionOpen(key: string) {
  const { isOpen, toggleSection } = useFormStore(
    useShallow((state) => ({
      isOpen: state.openSections.has(key),
      toggleSection: state.toggleSection,
    })),
  )

  return {
    isOpen,
    onToggle: (open: boolean) => toggleSection(key, open),
  }
}
