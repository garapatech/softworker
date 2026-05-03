import { ValidationSummary } from '@/components/feedback/validation-summary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useResumeStore } from '@/stores/resume.store'

export function StatusAlert() {
  const message = useResumeStore((state) => state.previewStatusMessage)
  const validationIssues = useResumeStore((state) => state.validationState.issues)

  if (!message && validationIssues.length === 0) {
    return null
  }

  return (
    <div className="border-b border-border/70 bg-destructive/5 px-5 py-4">
      <Alert variant="destructive">
        <AlertTitle>Status</AlertTitle>
        {message ? <AlertDescription>{message}</AlertDescription> : null}
        <ValidationSummary issues={validationIssues} />
      </Alert>
    </div>
  )
}
