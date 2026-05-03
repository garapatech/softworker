import { useShallow } from 'zustand/react/shallow'
import { useFormStore } from '@/stores/form.store'

export function useWorkspaceMode() {
  return useFormStore(
    useShallow((state) => ({
      mode: state.mode,
      setMode: state.setMode,
    })),
  )
}
