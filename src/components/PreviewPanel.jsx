import { useEffect, useRef, useState } from 'react'

function PreviewPanel({
  svgSource,
  preview,
  svgFileName,
  variant = 'panel',
  allowPan = false,
  zoom = 1,
  objectScale = 1,
  pan: panProp,
  setPan: setPanProp,
}) {
  const [localPan, setLocalPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [spaceActive, setSpaceActive] = useState(false)
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const pan = panProp || localPan
  const setPan = setPanProp || setLocalPan

  useEffect(() => {
    if (!allowPan) return
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setSpaceActive(true)
      }
    }
    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setSpaceActive(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [allowPan])
  if (variant === 'overlay') {
    const cursorClass = isPanning ? 'cursor-grabbing' : spaceActive ? 'cursor-grab' : 'cursor-default'
    return (
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center ${allowPan ? 'pointer-events-auto' : 'pointer-events-none'} ${cursorClass}`}
        onPointerDown={(event) => {
          if (!allowPan || !spaceActive) return
          panStartRef.current = {
            x: event.clientX,
            y: event.clientY,
            panX: pan.x,
            panY: pan.y,
          }
          setIsPanning(true)
        }}
        onPointerMove={(event) => {
          if (!allowPan || !isPanning) return
          const dx = event.clientX - panStartRef.current.x
          const dy = event.clientY - panStartRef.current.y
          setPan({ x: panStartRef.current.panX + dx, y: panStartRef.current.panY + dy })
        }}
        onPointerUp={() => setIsPanning(false)}
        onPointerLeave={() => setIsPanning(false)}
      >
        {svgSource.trim().length > 0 ? (
          <div
            className="max-h-[70vh] max-w-[70vw]"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
          >
            <div
              className="[&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto"
              style={{ transform: `scale(${objectScale})` }}
            >
              <div dangerouslySetInnerHTML={{ __html: preview.html }} />
            </div>
          </div>
        ) : (
          <div className="text-sm text-fg-48">
            Distorted SVG preview will render here.
          </div>
        )}
      </div>
    )
  }

  const gridStyle = {
    aspectRatio: '4 / 3',
    backgroundImage:
      'linear-gradient(to right, color-mix(in srgb, var(--kol-surface-on-primary) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--kol-surface-on-primary) 18%, transparent) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
  }

  return (
    <section className="flex-1 rounded border border-fg-08 bg-fg-02 p-4">
      <div className="flex items-center justify-between">
        <h2 className="control-heading text-fg-64">Preview</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-fg-48">
          paper.js / rough.js
        </span>
      </div>
      <div
        className="relative mt-4 w-full overflow-hidden rounded border border-fg-08 bg-surface-primary"
        style={gridStyle}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-px w-full"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent)',
          }}
        />
        {svgSource.trim().length > 0 ? (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div
              className="max-h-full max-w-full [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: preview.html }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-fg-48">
            Distorted SVG preview will render here.
          </div>
        )}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.2em] text-fg-64">
        {svgFileName ? `Loaded: ${svgFileName}` : 'Paste or upload an SVG.'}
        {preview.baseNodes ? ` • Nodes: ${preview.baseNodes} -> ${preview.nodeCount}` : ''}
      </div>
      {preview.error ? (
        <div className="mt-2 text-xs text-rose-300">{preview.error}</div>
      ) : null}
    </section>
  )
}

export default PreviewPanel
