import { useEffect, useRef, useState, type RefObject } from 'react'

const A4_WIDTH = 794
const BOTTOM_GAP = 32

export function PreviewFrame({
  iframeId,
  previewFrameRef,
  previewHtml,
}: {
  iframeId: string
  previewFrameRef: RefObject<HTMLIFrameElement | null>
  previewHtml: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [contentHeight, setContentHeight] = useState(1123)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const element = containerRef.current

    if (!element) {
      return
    }

    const updateScale = () => {
      const nextScale = Math.min(1, element.clientWidth / A4_WIDTH)
      setScale(nextScale)
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  function handleLoad() {
    const iframe = previewFrameRef.current
    const document = iframe?.contentDocument

    if (!document) {
      return
    }

    const nextHeight = Math.max(
      1123,
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0,
    )

    setContentHeight(nextHeight)
  }

  return (
    <div className="h-full w-full pb-6 pt-3 sm:px-4 sm:pb-8 sm:pt-4 xl:px-4 xl:pb-8 xl:pt-4">
      <div ref={containerRef} className="flex min-h-[70vh] w-full items-center justify-center xl:min-h-0">
        <div
          className="relative shrink-0"
          style={{
            height: `${(contentHeight + BOTTOM_GAP) * scale}px`,
            width: `${A4_WIDTH * scale}px`,
          }}
        >
          <iframe
            ref={previewFrameRef}
            id={iframeId}
            title="Pré-visualização do currículo"
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
