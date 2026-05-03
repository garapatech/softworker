import { ResumeField } from '@/components/workspace/fields/resume-field'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { PathPart } from '@/services/resume.service'

export function ResumeFieldList({
  fields,
  pathPrefix,
}: {
  fields: FieldDefinition[]
  pathPrefix: PathPart[]
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
          />
        )
      })}
    </div>
  )
}
