import { Button } from './atoms'

function ControlsPanel({
  svgInput,
  onUpload,
  onPasteChange,
  amount,
  setAmount,
  frequency,
  setFrequency,
  smoothness,
  setSmoothness,
  seed,
  setSeed,
  zoom,
  setZoom,
  objectScale,
  setObjectScale,
  previewMode,
  onToggleMode,
  onExport,
  onRefine,
  variant = 'panel',
}) {
  const containerClass =
    variant === 'overlay'
      ? 'w-full lg:w-[380px] rounded border border-fg-08 bg-[#121215] p-4 text-fg-64'
      : 'w-full lg:w-[380px] rounded border border-fg-08 bg-fg-02 p-4 text-fg-64'

  return (
    <section className={containerClass}>
      <h2 className="control-heading">Controls</h2>
      <div className="mt-4 grid gap-4">
        <label className="control-label">
          Upload SVG
          <input
            type="file"
            accept=".svg"
            onChange={onUpload}
            className="mt-2 w-full rounded border border-fg-08 bg-surface-primary px-3 py-2 text-xs file:mr-3 file:rounded file:border-0 file:bg-fg-08 file:px-3 file:py-2 file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-fg-88"
          />
        </label>
        <label className="control-label">
          Paste SVG code
          <textarea
            rows={6}
            placeholder="<svg>...</svg>"
            value={svgInput}
            onChange={onPasteChange}
            className="mt-2 w-full rounded border border-fg-08 bg-surface-primary px-3 py-2 text-xs placeholder:text-fg-24"
          />
        </label>
        <label className="control-label">
          Amount
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="50"
              value={Math.min(50, amount)}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="slider-black w-full"
            />
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
            />
          </div>
        </label>
        <label className="control-label">
          Frequency
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="50"
              value={Math.min(50, frequency)}
              onChange={(event) => setFrequency(Number(event.target.value))}
              className="slider-black w-full"
            />
            <input
              type="number"
              value={frequency}
              onChange={(event) => setFrequency(Number(event.target.value))}
              className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
            />
          </div>
        </label>
        <label className="control-label">
          Smoothness
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="300"
              value={Math.min(300, smoothness)}
              onChange={(event) => setSmoothness(Number(event.target.value))}
              className="slider-black w-full"
            />
            <input
              type="number"
              value={smoothness}
              onChange={(event) => setSmoothness(Number(event.target.value))}
              className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
            />
          </div>
        </label>
        <label className="control-label">
          Seed
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1000"
              value={Math.min(1000, seed)}
              onChange={(event) => setSeed(Number(event.target.value))}
              className="slider-black w-full"
            />
            <input
              type="number"
              value={seed}
              onChange={(event) => setSeed(Number(event.target.value))}
              className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
            />
          </div>
        </label>
        {typeof zoom === 'number' && typeof setZoom === 'function' ? (
          <label className="control-label">
            Zoom
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="slider-black w-full"
              />
              <input
                type="number"
                value={zoom}
                step="0.05"
                onChange={(event) => setZoom(Number(event.target.value))}
                className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
              />
            </div>
          </label>
        ) : null}
        {typeof objectScale === 'number' &&
        typeof setObjectScale === 'function' ? (
          <label className="control-label">
            Scale
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.05"
                value={objectScale}
                onChange={(event) => setObjectScale(Number(event.target.value))}
                className="slider-black w-full"
              />
              <input
                type="number"
                value={objectScale}
                step="0.05"
                onChange={(event) =>
                  setObjectScale(Number(event.target.value))
                }
                className="hide-number-spinners w-20 rounded-[4px] border border-fg-08 bg-[#121215] px-2 py-1 text-xs"
              />
            </div>
          </label>
        ) : null}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 border-t border-fg-08 pt-4">
        {onRefine ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefine}
            style={{ backgroundColor: '#121215' }}
            className="border-fg-08"
          >
            Refine SVG
          </Button>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMode}
          style={{ backgroundColor: '#121215' }}
          className="border-fg-08"
        >
          {previewMode === 'bake' ? 'Mode: Bake' : 'Mode: Filter'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          style={{ backgroundColor: '#121215' }}
          className="border-fg-08"
        >
          Toggle Original
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          style={{ backgroundColor: '#121215' }}
          className="border-fg-08"
        >
          Export SVG
        </Button>
      </div>
    </section>
  )
}

export default ControlsPanel
