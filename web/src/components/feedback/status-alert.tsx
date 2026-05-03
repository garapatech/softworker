import { ValidationSummary } from '@/components/feedback/validation-summary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useStatusAlert } from '@/hooks/use-status-alert'

export function StatusAlert() {
  const { message, validationIssues } = useStatusAlert()

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
