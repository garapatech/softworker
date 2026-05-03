import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { NestedSection } from '@/components/workspace/sections/nested-section'
import { SectionHeader } from '@/components/workspace/sections/section-header'
import { Card, CardContent } from '@/components/ui/card'
import type { PathPart, JsonObject, JsonValue } from '@/services/resume.service'
import type { ObjectSectionDefinition } from '@/services/resume-form.service'

export function ObjectSection({
  isOpen,
  onChange,
  onToggle,
  resume,
  section,
  validationErrors,
}: {
  isOpen: boolean
  onChange: (path: PathPart[], value: JsonValue) => void
  onToggle: (open: boolean) => void
  resume: JsonObject
  section: ObjectSectionDefinition
  validationErrors: Record<string, string[]>
}) {
  const values = (resume[section.key] as JsonObject | undefined) ?? {}

  return (
    <Card className="overflow-hidden border-border/70 shadow-sm shadow-black/5">
      <SectionHeader title={section.title} isOpen={isOpen} onToggle={() => onToggle(!isOpen)} />

      {isOpen ? (
        <CardContent className="space-y-4 border-t border-border/70 bg-muted/10 pt-5">
          <ResumeFieldList
            fields={section.fields}
            onChange={onChange}
            pathPrefix={[section.key]}
            validationErrors={validationErrors}
            values={values}
          />

          {section.nested?.map((nested) => (
            <NestedSection
              key={`${section.key}.${nested.key}`}
              parentKey={section.key}
              section={nested}
              values={(values[nested.key] as JsonObject | undefined) ?? {}}
              validationErrors={validationErrors}
              onChange={onChange}
            />
          ))}
        </CardContent>
      ) : null}
    </Card>
  )
}
