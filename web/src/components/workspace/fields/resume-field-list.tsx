import { ResumeField } from '@/components/workspace/fields/resume-field'
import type { FieldDefinition } from '@/services/resume-form.service'
import type { UiStrings } from '@/services/ui-i18n.service'
import type { PathPart } from '@/services/resume.service'
import type { ReactElement } from 'react'

export function ResumeFieldList({
  fields,
  pathPrefix,
  ui,
}: {
  fields: FieldDefinition[]
  pathPrefix: PathPart[]
  ui: UiStrings
}): ReactElement {
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
            ui={ui}
          />
        )
      })}
    </div>
  )
}
