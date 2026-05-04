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

export function getFieldValue(value: unknown, field: { type?: string }) {
  if (field.type === 'list') {
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  }

  return typeof value === 'string' ? value : ''
}

function toPathLabel(path: string[]) {
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
    const path = issue.path.map(String).join('.')
    const label = toPathLabel(issue.path.map(String))

    byPath[path] ??= []
    byPath[path].push(issue.message)
    formattedIssues.push({ label, message: issue.message, path })
  }

  return {
    byPath,
    issues: formattedIssues,
  }
}
