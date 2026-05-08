import { PreviewPanel } from '@/components/preview/preview-panel'
import { StatusAlert } from '@/components/feedback/status-alert'
import { Card } from '@/components/ui/card'
import { WorkspaceHeader } from '@/components/workspace/header'
import { WorkspaceModeSwitch } from '@/components/workspace/mode-switch'
import { ArraySection } from '@/components/workspace/sections/array-section'
import { ObjectSection } from '@/components/workspace/sections/object-section'
import { SourceEditor } from '@/components/workspace/source-editor'
import { useEffect, type ReactElement } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { getFormSections, getUiStrings, lowercaseForLanguage, syncI18nLanguage } from '@/services/ui-i18n.service'
import { saveWorkspacePersistence } from '@/services/workspace-persistence.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

function App(): ReactElement {
  const { jsonDraft, mode } = useFormStore(
    useShallow((state) => ({
      jsonDraft: state.jsonDraft,
      mode: state.mode,
    })),
  )
  const {
    downloadJson,
    language,
    previewHtml,
    previewStatusMessage,
    renderPreview,
    resumeDraft,
    setLanguage,
    setResumeDraft,
    hasValidationIssues,
    validationIssueCounts,
    validationIssues,
  } = useResumeStore(
    useShallow((state) => ({
      downloadJson: state.downloadJson,
      language: state.language,
      previewHtml: state.previewHtml,
      previewStatusMessage: state.previewStatusMessage,
      renderPreview: state.renderPreview,
      resumeDraft: state.resumeDraft,
      setLanguage: state.setLanguage,
      setResumeDraft: state.setResumeDraft,
      hasValidationIssues: state.validationState.issues.length > 0,
      validationIssueCounts: state.validationIssueCounts,
      validationIssues: state.validationState.issues,
    })),
  )
  const ui = getUiStrings(language)
  const formSections = getFormSections(language)

  useEffect(() => {
    void syncI18nLanguage(language)
  }, [language])

  useEffect(() => {
    saveWorkspacePersistence({
      jsonDraft,
      language,
      mode,
      resumeDraft,
    })
  }, [jsonDraft, language, mode, resumeDraft])

  useEffect(() => {
    void renderPreview()
  }, [language, renderPreview, resumeDraft])

  return (
    <main className="min-h-screen px-2 py-2 sm:px-3 sm:py-3 xl:px-4 xl:py-4">
      <div className="mx-auto grid max-w-[1888px] gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] xl:items-start">
        <Card className="grid min-h-0 min-w-0 overflow-hidden border-border/80 bg-card xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <WorkspaceHeader language={language} setLanguage={setLanguage} ui={ui} />
          <StatusAlert message={previewStatusMessage} ui={ui} validationIssues={validationIssues} />
          <WorkspaceModeSwitch ui={ui} />
          {mode === 'source' ? (
            <SourceEditor
              language={language}
              setResumeDraft={setResumeDraft}
              ui={ui}
              hasValidationIssues={hasValidationIssues}
            />
          ) : (
            <div className="grid gap-3 overflow-auto p-3 sm:p-4">
              {formSections.map((section) =>
                'key' in section ? (
                  <ObjectSection
                    key={section.key}
                    section={section}
                    ui={ui}
                    validationIssueCounts={validationIssueCounts}
                  />
                ) : (
                  <ArraySection
                    key={section.path.join('.')}
                    section={section}
                    ui={ui}
                    validationIssueCounts={validationIssueCounts}
                    itemTitleLowercase={lowercaseForLanguage(section.itemTitle, language)}
                  />
                ),
              )}
            </div>
          )}
        </Card>
        <PreviewPanel downloadJson={downloadJson} previewHtml={previewHtml} ui={ui} />
      </div>
    </main>
  )
}

export default App
