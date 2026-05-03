import { getFieldValue, parseLines } from '@/mappers/resume.mapper'
import { FieldWrapper } from '@/components/workspace/fields/field-wrapper'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { JsonValue, PathPart } from '@/services/resume.service'
import type { FieldDefinition } from '@/services/resume-form.service'

export function ResumeField({
  error,
  field,
  onChange,
  path,
  value,
}: {
  error?: string
  field: FieldDefinition
  onChange: (path: PathPart[], value: JsonValue) => void
  path: PathPart[]
  value: JsonValue | undefined
}) {
  const fieldId = path.join('.')
  const currentValue = getFieldValue(value, field)

  return (
    <FieldWrapper
      id={fieldId}
      label={field.label}
      required={field.required}
      error={error}
      full={field.full}
    >
      {field.type === 'textarea' ? (
        <Textarea
          id={fieldId}
          value={currentValue}
          spellCheck
          onChange={(event) => onChange(path, event.target.value)}
          className="min-h-28 bg-background"
        />
      ) : null}

      {field.type === 'list' ? (
        <Textarea
          id={fieldId}
          value={currentValue}
          spellCheck={false}
          onChange={(event) => onChange(path, parseLines(event.target.value))}
          className="min-h-28 bg-background"
        />
      ) : null}

      {field.type !== 'textarea' && field.type !== 'list' ? (
        <Input
          id={fieldId}
          type={field.type === 'email' || field.type === 'url' ? field.type : 'text'}
          value={currentValue}
          onChange={(event) => onChange(path, event.target.value)}
          spellCheck={false}
          className="bg-background"
        />
      ) : null}
    </FieldWrapper>
  )
}
