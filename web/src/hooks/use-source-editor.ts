import { useShallow } from 'zustand/react/shallow'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useSourceEditor() {
  const { applyJsonDraft, jsonDraft, jsonStatusMessage } = useFormStore(
    useShallow((state) => ({
      applyJsonDraft: state.applyJsonDraft,
      jsonDraft: state.jsonDraft,
      jsonStatusMessage: state.jsonStatusMessage,
    })),
  )
  const validationIssueCount = useResumeStore((state) => state.validationState.issues.length)

  return {
    hasErrors: Boolean(jsonStatusMessage) || validationIssueCount > 0,
    message: jsonStatusMessage,
    onChange: applyJsonDraft,
    value: jsonDraft,
  }
}
