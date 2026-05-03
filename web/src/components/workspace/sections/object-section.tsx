import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { CollapsibleSectionPanel } from '@/components/workspace/sections/collapsible-section-panel'
import { NestedSection } from '@/components/workspace/sections/nested-section'
import { useSectionPanel } from '@/hooks/use-section-panel'
import type { ObjectSectionDefinition } from '@/services/resume-form.service'

export function ObjectSection({ section }: { section: ObjectSectionDefinition }) {
  const { contentId, errorCount, headingId, isOpen, onToggle, sectionId } = useSectionPanel(section.key)

  return (
    <CollapsibleSectionPanel
      title={section.title}
      subtitle={errorCount > 0 ? `${errorCount} ${errorCount === 1 ? 'ajuste pendente' : 'ajustes pendentes'}` : undefined}
      sectionId={sectionId}
      headingId={headingId}
      contentId={contentId}
      isOpen={isOpen}
      onToggle={onToggle}
      contentClassName="space-y-4 border-t border-border/70 bg-muted/10 pt-5"
    >
      <ResumeFieldList
        fields={section.fields}
        pathPrefix={[section.key]}
      />

      {section.nested?.map((nested) => (
        <NestedSection
          key={`${section.key}.${nested.key}`}
          parentKey={section.key}
          section={nested}
        />
      ))}
    </CollapsibleSectionPanel>
  )
}
