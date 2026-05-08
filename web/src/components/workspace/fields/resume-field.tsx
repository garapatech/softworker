import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeListField } from '@/components/workspace/fields/resume-list-field'
import { getAtPath } from '@/services/resume.service'
import type { UiStrings } from '@/services/ui-i18n.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import type { PathPart } from '@/services/resume.service'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { ChangeEvent } from 'react'
import type { ReactElement } from 'react'
import { useShallow } from 'zustand/react/shallow'

export function ResumeField({
  field,
  path,
  ui,
}: {
  field: FieldDefinition
  path: PathPart[]
  ui: UiStrings
}): ReactElement {
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)
  const fieldId = path.join('.')
  const { error, updateField, value } = useResumeStore(
    useShallow((state) => ({
      error: state.validationState.byPath[fieldId]?.[0],
      updateField: state.updateField,
      value: getAtPath(state.resumeDraft, path),
    })),
  )

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
    <div className={field.full ? 'flex h-full flex-col gap-2.5 md:col-span-2' : 'flex h-full flex-col gap-2.5'}>
      <Label htmlFor={fieldId}>
        {field.label}
        {field.required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      <div className="flex flex-1 flex-col">
        {inputKind === 'input' ? (
          <Input
            id={fieldId}
            type={inputType}
            placeholder={field.type === 'date' ? 'yyyy-mm-dd' : field.type === 'url' ? 'https://' : undefined}
            value={typeof currentValue === 'string' ? currentValue : ''}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              updateField(path, event.target.value)
              clearJsonStatus()
            }}
            spellCheck={false}
            className="bg-background"
          />
        ) : inputKind === 'list' ? (
          <ResumeListField
            fieldId={fieldId}
            items={Array.isArray(currentValue) ? currentValue : []}
            ui={ui}
            onValueChange={(nextValue: string[]): void => {
              updateField(path, nextValue)
              clearJsonStatus()
            }}
          />
        ) : (
          <Textarea
            id={fieldId}
            value={typeof currentValue === 'string' ? currentValue : ''}
            spellCheck={true}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
              updateField(path, event.target.value)
              clearJsonStatus()
            }}
            className="min-h-28 bg-background"
          />
        )}
      </div>

      <p className="min-h-4 text-xs font-medium text-destructive">{error ?? ''}</p>
    </div>
  )
}
