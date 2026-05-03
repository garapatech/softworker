import { ResumeField } from '@/components/workspace/fields/resume-field'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { JsonObject, JsonValue, PathPart } from '@/services/resume.service'

export function ResumeFieldList({
  fields,
  onChange,
  pathPrefix,
  validationErrors,
  values,
}: {
  fields: FieldDefinition[]
  onChange: (path: PathPart[], value: JsonValue) => void
  pathPrefix: PathPart[]
  validationErrors: Record<string, string[]>
  values: JsonObject
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field) => {
        const path = [...pathPrefix, field.key]
        const pathKey = path.join('.')

        return (
          <ResumeField
            key={pathKey}
            field={field}
            path={path}
            value={values[field.key]}
            error={validationErrors[pathKey]?.[0]}
            onChange={onChange}
          />
        )
      })}
    </div>
  )
}
