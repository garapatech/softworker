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
        {validationIssues.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-destructive">
            {validationIssues.map((issue) => (
              <li key={`${issue.path}:${issue.message}`}>
                <strong>{issue.label}</strong>: {issue.message}
              </li>
            ))}
          </ul>
        ) : null}
      </Alert>
    </div>
  )
}
