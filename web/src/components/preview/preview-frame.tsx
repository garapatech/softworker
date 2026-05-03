import { useEffect, useRef, useState, type RefObject } from 'react'

const A4_WIDTH = 794
const A4_HEIGHT = 1123

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

  return (
    <div ref={containerRef} className="flex min-h-[70vh] w-full items-start justify-center overflow-auto xl:min-h-0">
      <div
        className="relative shrink-0"
        style={{
          height: `${A4_HEIGHT * scale}px`,
          width: `${A4_WIDTH * scale}px`,
        }}
      >
        <iframe
          ref={previewFrameRef}
          id={iframeId}
          title="Pré-visualização do currículo"
          className="absolute top-0 left-0 rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.05)]"
          style={{
            height: `${A4_HEIGHT}px`,
            width: `${A4_WIDTH}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          srcDoc={previewHtml}
        />
      </div>
    </div>
  )
}
