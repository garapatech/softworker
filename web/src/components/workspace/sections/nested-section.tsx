import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { Badge } from '@/components/ui/badge'
import { useValidationIssueCount } from '@/hooks/use-validation-issue-count'
import { type NestedSectionDefinition } from '@/services/resume-form.service'

export function NestedSection({
  parentKey,
  section,
}: {
  parentKey: string
  section: NestedSectionDefinition
}) {
  const errorCount = useValidationIssueCount(`${parentKey}.${section.key}`)

  return (
    <section className="rounded-xl border border-border/70 bg-background/80 p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-[0.92rem] font-extrabold leading-[1.18]">{section.title}</h3>
        {errorCount > 0 ? (
          <Badge className="border-rose-200 bg-rose-50 text-rose-700">
            {errorCount} {errorCount === 1 ? 'ajuste' : 'ajustes'}
          </Badge>
        ) : null}
      </div>
      <ResumeFieldList
        fields={section.fields}
        pathPrefix={[parentKey, section.key]}
      />
    </section>
  )
}
