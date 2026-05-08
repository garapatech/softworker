import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeListField } from '@/components/workspace/fields/resume-list-field'
import { getAtPath } from '@/services/resume.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import type { JsonValue, PathPart } from '@/services/resume.service'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { ChangeEvent } from 'react'
import type { ReactElement } from 'react'

export function ResumeField({
  field,
  path,
}: {
  field: FieldDefinition
  path: PathPart[]
}): ReactElement {
  const updateField = useResumeStore((state) => state.updateField)
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)
  const fieldId = path.join('.')
  const value = useResumeStore((state) => getAtPath(state.resumeDraft, path))
  const error = useResumeStore((state) => state.validationState.byPath[fieldId]?.[0])
  const currentValue =
    field.type === 'list'
      ? Array.isArray(value)
        ? value.filter((item): item is string => typeof item === 'string')
        : []
      : typeof value === 'string'
        ? value
        : ''
  const inputKind = field.type === 'textarea' || field.type === 'list' ? field.type : 'input'
  const inputType = field.type === 'email' || field.type === 'url' ? field.type : 'text'

  return (
    <div className={field.full ? 'grid gap-2.5 md:col-span-2' : 'grid gap-2.5'}>
      <Label htmlFor={fieldId}>
        {field.label}
        {field.required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {inputKind === 'input' ? (
        <Input
          id={fieldId}
          type={inputType}
          value={typeof currentValue === 'string' ? currentValue : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            updateField(path, event.target.value as JsonValue)
            clearJsonStatus()
          }}
          spellCheck={false}
          className="bg-background"
        />
      ) : inputKind === 'list' ? (
        <ResumeListField
          fieldId={fieldId}
          items={Array.isArray(currentValue) ? currentValue : []}
          onValueChange={(nextValue: string[]): void => {
            updateField(path, nextValue as JsonValue)
            clearJsonStatus()
          }}
        />
      ) : (
        <Textarea
          id={fieldId}
          value={typeof currentValue === 'string' ? currentValue : ''}
          spellCheck={true}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
            updateField(path, event.target.value as JsonValue)
            clearJsonStatus()
          }}
          className="min-h-28 bg-background"
        />
      )}

      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  )
}
