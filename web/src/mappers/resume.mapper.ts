import type { ZodIssue } from 'zod'

export interface ValidationIssue {
  label: string
  message: string
  path: string
}

export interface ValidationState {
  byPath: Record<string, string[]>
  issues: ValidationIssue[]
}

function toPathLabel(path: string[]): string {
  if (path.length === 0) {
    return 'currículo'
  }

  return path
    .map((part) => (/^\d+$/.test(part) ? `item ${Number(part) + 1}` : part))
    .join(' / ')
}

export function mapValidationIssues(issues: ZodIssue[]): ValidationState {
  const byPath: Record<string, string[]> = {}
  const formattedIssues: ValidationIssue[] = []

  for (const issue of issues) {
    const pathParts: string[] = issue.path.map(String)
    const path: string = pathParts.join('.')

    byPath[path] ??= []
    byPath[path].push(issue.message)
    formattedIssues.push({
      label: toPathLabel(pathParts),
      message: issue.message,
      path,
    })
  }

  return {
    byPath,
    issues: formattedIssues,
  }
}
