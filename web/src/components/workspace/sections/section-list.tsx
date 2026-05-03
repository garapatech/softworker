import { ArraySection } from '@/components/workspace/sections/array-section'
import { ObjectSection } from '@/components/workspace/sections/object-section'
import { ARRAY_SECTIONS, OBJECT_SECTIONS, sectionKey } from '@/services/resume-form.service'
import type { JsonObject, JsonValue, PathPart } from '@/services/resume.service'

export function SectionList({
  onAdd,
  onChange,
  onRemove,
  onToggle,
  openSections,
  resume,
  validationErrors,
}: {
  onAdd: (path: string[], item: JsonObject) => void
  onChange: (path: PathPart[], value: JsonValue) => void
  onRemove: (path: string[], index: number) => void
  onToggle: (key: string, open: boolean) => void
  openSections: Set<string>
  resume: JsonObject
  validationErrors: Record<string, string[]>
}) {
  return (
    <>
      {OBJECT_SECTIONS.map((section) => (
        <ObjectSection
          key={section.key}
          section={section}
          resume={resume}
          isOpen={openSections.has(sectionKey(section))}
          onToggle={(open) => onToggle(sectionKey(section), open)}
          onChange={onChange}
          validationErrors={validationErrors}
        />
      ))}

      {ARRAY_SECTIONS.map((section) => (
        <ArraySection
          key={sectionKey(section)}
          section={section}
          resume={resume}
          isOpen={openSections.has(sectionKey(section))}
          onToggle={(open) => onToggle(sectionKey(section), open)}
          onChange={onChange}
          onAdd={onAdd}
          onRemove={onRemove}
          validationErrors={validationErrors}
        />
      ))}
    </>
  )
}
