import { SectionList } from '@/components/workspace/sections/section-list'
import { useResumeForm } from '@/hooks/use-resume-form'

export function ResumeForm() {
  const { onAdd, onChange, onRemove, onToggle, openSections, resume, validationErrors } = useResumeForm()

  return (
    <div className="grid gap-3 overflow-auto p-4">
      <SectionList
        resume={resume}
        openSections={openSections}
        onToggle={onToggle}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        validationErrors={validationErrors}
      />
    </div>
  )
}
