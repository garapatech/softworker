import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { CollapsibleSectionPanel } from '@/components/workspace/sections/collapsible-section-panel'
import { Badge } from '@/components/ui/badge'
import type {
  NestedSectionDefinition,
  ObjectSectionDefinition,
  ValidationIssueCounts,
} from '@/services/resume-form.service'
import { formatCountLabel, type UiStrings } from '@/services/ui-i18n.service'
import { useFormStore } from '@/stores/form.store'
import type { ReactElement } from 'react'
import { useShallow } from 'zustand/react/shallow'

function NestedSection({
  parentKey,
  validationIssueCounts,
  section,
  ui,
}: {
  parentKey: string
  validationIssueCounts: ValidationIssueCounts
  section: NestedSectionDefinition
  ui: UiStrings
}): ReactElement {
  const errorCount = validationIssueCounts[`${parentKey}.${section.key}`] ?? 0

  return (
    <section className="rounded-xl border border-border/70 bg-background/80 p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-[0.92rem] font-extrabold leading-[1.18]">{section.title}</h3>
        {errorCount > 0 ? (
          <Badge className="whitespace-nowrap border-rose-200 bg-rose-50 text-rose-700">
            {formatCountLabel(errorCount, ui.validationIssueOne, ui.validationIssueOther)}
          </Badge>
        ) : null}
      </div>
      <ResumeFieldList
        fields={section.fields}
        pathPrefix={[parentKey, section.key]}
        ui={ui}
      />
    </section>
  )
}

export function ObjectSection({
  section,
  ui,
  validationIssueCounts,
}: {
  section: ObjectSectionDefinition
  ui: UiStrings
  validationIssueCounts: ValidationIssueCounts
}): ReactElement {
  const sectionId = `section-${section.key.replaceAll('.', '-')}`
  const headingId = `${sectionId}-heading`
  const contentId = `${sectionId}-content`
  const errorCount = validationIssueCounts[section.key] ?? 0
  const { isOpen, toggleSection } = useFormStore(
    useShallow((state) => ({
      isOpen: state.openSections.has(section.key),
      toggleSection: state.toggleSection,
    })),
  )

  return (
    <CollapsibleSectionPanel
      title={section.title}
      subtitle={errorCount > 0 ? formatCountLabel(errorCount, ui.validationAdjustOne, ui.validationAdjustOther) : undefined}
      sectionId={sectionId}
      headingId={headingId}
      contentId={contentId}
      isOpen={isOpen}
      onToggle={() => toggleSection(section.key, !isOpen)}
      contentClassName="space-y-4 border-t border-border/70 bg-muted/10 pt-5"
    >
      <ResumeFieldList
        fields={section.fields}
        pathPrefix={[section.key]}
        ui={ui}
      />

      {section.nested?.map((nested) => (
        <NestedSection
          key={`${section.key}.${nested.key}`}
          parentKey={section.key}
          validationIssueCounts={validationIssueCounts}
          section={nested}
          ui={ui}
        />
      ))}
    </CollapsibleSectionPanel>
  )
}
