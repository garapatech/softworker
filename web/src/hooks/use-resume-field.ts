import { getFieldValue } from '@/mappers/resume.mapper'
import { useResumeChange } from '@/hooks/use-resume-change'
import { useResumeValue } from '@/hooks/use-resume-value'
import { useValidationError } from '@/hooks/use-validation-error'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { JsonValue, PathPart } from '@/services/resume.service'

type ResumeFieldInputKind = 'input' | 'list' | 'textarea'

function resolveInputKind(type: FieldDefinition['type']): ResumeFieldInputKind {
  if (type === 'textarea' || type === 'list') {
    return type
  }

  return 'input'
}

export function useResumeField(field: FieldDefinition, path: PathPart[]) {
  const onChange = useResumeChange()
  const fieldId = path.join('.')
  const value = useResumeValue(path)
  const error = useValidationError(fieldId)

  return {
    currentValue: getFieldValue(value, field),
    error,
    fieldId,
    inputKind: resolveInputKind(field.type),
    inputType: field.type === 'email' || field.type === 'url' ? field.type : 'text',
    onValueChange: (nextValue: string | string[]) => onChange(path, nextValue as JsonValue),
  }
}
