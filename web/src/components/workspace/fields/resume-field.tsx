import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeListField } from '@/components/workspace/fields/resume-list-field'
import { useResumeField } from '@/hooks/use-resume-field'
import type { PathPart } from '@/services/resume.service'
import type { FieldDefinition } from '@/services/resume-form.service'

function renderFieldControl({
  currentValue,
  fieldId,
  inputKind,
  inputType,
  onValueChange,
}: Pick<ReturnType<typeof useResumeField>, 'currentValue' | 'fieldId' | 'inputKind' | 'inputType' | 'onValueChange'>) {
  if (inputKind === 'input') {
    return (
      <Input
        id={fieldId}
        type={inputType}
        value={currentValue}
        onChange={(event) => onValueChange(event.target.value)}
        spellCheck={false}
        className="bg-background"
      />
    )
  }

  if (inputKind === 'list') {
    return (
      <ResumeListField
        fieldId={fieldId}
        items={Array.isArray(currentValue) ? currentValue : []}
        onValueChange={onValueChange}
      />
    )
  }

  return (
    <Textarea
      id={fieldId}
      value={typeof currentValue === 'string' ? currentValue : ''}
      spellCheck={inputKind === 'textarea'}
      onChange={(event) => onValueChange(event.target.value)}
      className="min-h-28 bg-background"
    />
  )
}

export function ResumeField({
  field,
  path,
}: {
  field: FieldDefinition
  path: PathPart[]
}) {
  const { currentValue, error, fieldId, inputKind, inputType, onValueChange } = useResumeField(field, path)

  return (
    <div className={field.full ? 'grid gap-2.5 md:col-span-2' : 'grid gap-2.5'}>
      <Label htmlFor={fieldId}>
        {field.label}
        {field.required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {renderFieldControl({ currentValue, fieldId, inputKind, inputType, onValueChange })}

      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  )
}
