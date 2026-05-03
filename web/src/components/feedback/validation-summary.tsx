import type { ValidationIssue } from '@/mappers/resume.mapper'

export function ValidationSummary({ issues }: { issues: ValidationIssue[] }) {
  if (issues.length === 0) {
    return null
  }

  return (
    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-destructive">
      {issues.map((issue) => (
        <li key={`${issue.path}:${issue.message}`}>
          <strong>{issue.label}</strong>: {issue.message}
        </li>
      ))}
    </ul>
  )
}
