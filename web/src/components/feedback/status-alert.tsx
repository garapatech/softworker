import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { ReactElement } from 'react'
import { type UiStrings } from '@/services/ui-i18n.service'
import type { ValidationIssue } from '@/mappers/resume.mapper'

type StatusAlertProps = {
  message: string
  ui: UiStrings
  validationIssues: ValidationIssue[]
}

export function StatusAlert({ message, ui, validationIssues }: StatusAlertProps): ReactElement | null {

  if (!message && validationIssues.length === 0) {
    return null
  }

  return (
    <div className="border-b border-border/70 bg-destructive/5 px-5 py-4">
      <Alert variant="destructive">
        <AlertTitle>{ui.statusTitle}</AlertTitle>
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
