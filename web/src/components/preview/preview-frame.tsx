import { useEffect, useRef, useState, type ReactElement, type RefObject } from 'react'
import { type UiStrings } from '@/services/ui-i18n.service'

const A4_WIDTH: number = 794
const A4_HEIGHT: number = 1123
const BOTTOM_GAP: number = 32

function getContentHeight(documentRef: Document): number {
  return Math.max(
    A4_HEIGHT,
    documentRef.documentElement.scrollHeight,
    documentRef.body?.scrollHeight ?? 0,
  )
}

export function PreviewFrame({
  iframeId,
  previewFrameRef,
  previewHtml,
  ui,
}: {
  iframeId: string
  previewFrameRef: RefObject<HTMLIFrameElement | null>
  previewHtml: string
  ui: UiStrings
}): ReactElement {
  const containerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  const [contentHeight, setContentHeight] = useState<number>(A4_HEIGHT)
  const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    const element: HTMLDivElement | null = containerRef.current

    if (!element) {
      return
    }

    const updateScale = (): void => {
      const nextScale: number = Math.min(1, element.clientWidth / A4_WIDTH)
      setScale(nextScale)
    }

    updateScale()

    const observer: ResizeObserver = new ResizeObserver(updateScale)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  function handleLoad(): void {
    const iframe: HTMLIFrameElement | null = previewFrameRef.current
    const documentRef: Document | null = iframe?.contentDocument ?? null

    if (!documentRef) {
      return
    }

    setContentHeight(getContentHeight(documentRef))
  }

  return (
    <div className="h-full w-full pb-3 pt-1.5 sm:px-3 sm:pb-6 sm:pt-3 xl:px-4 xl:pb-8 xl:pt-4">
      <div
        ref={containerRef}
        className="flex min-h-[34vh] w-full items-start justify-center sm:min-h-[42vh] lg:min-h-[52vh] xl:min-h-0 xl:items-center"
      >
        <div
          className="relative shrink-0 max-w-full"
          style={{
            height: `${(contentHeight + BOTTOM_GAP) * scale}px`,
            width: `${A4_WIDTH * scale}px`,
          }}
        >
          <iframe
            ref={previewFrameRef}
            id={iframeId}
            title={ui.previewFrameTitle}
            scrolling="no"
            className="absolute top-0 left-0 rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.05)]"
            style={{
              height: `${contentHeight}px`,
              width: `${A4_WIDTH}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            srcDoc={previewHtml}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  )
}
