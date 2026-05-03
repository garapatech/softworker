import { ArraySection } from '@/components/workspace/sections/array-section'
import { ObjectSection } from '@/components/workspace/sections/object-section'
import { FORM_SECTIONS, sectionKey } from '@/services/resume-form.service'

export function SectionList() {
  return (
    <>
      {FORM_SECTIONS.map((section) =>
        'key' in section ? <ObjectSection key={section.key} section={section} /> : <ArraySection key={sectionKey(section)} section={section} />,
      )}
    </>
  )
}
