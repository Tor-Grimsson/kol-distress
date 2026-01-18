function LeftPanel({ modes, activeMode, onSelectMode, variant = 'panel' }) {
  const containerClass =
    variant === 'overlay'
      ? 'rounded border border-fg-08 bg-[#121215] p-4 text-fg-64'
      : 'rounded border border-fg-08 bg-fg-02 p-4 text-fg-64'

  return (
    <aside className="w-full lg:w-80">
      <div className={containerClass}>
        <p className="control-heading">Kolkrabbi</p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-[0.08em] text-fg-96">
          Workshop
        </h1>
        <p className="mt-2 text-sm text-fg-64">
          Distressed outlines from basic vectors with print-worn texture.
        </p>

        <div className="mt-6 space-y-5 border-t border-fg-08 pt-5">
          <div>
            <p className="control-heading">Distortion Modes</p>
            <div className="mt-3 grid gap-2">
              {modes.map((mode) => {
                const isActive = mode.id === activeMode.id
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => onSelectMode(mode)}
                    style={{ borderRadius: 4 }}
                    className={`sidebar-menu-item flex items-center justify-between rounded border px-4 py-2 text-left text-xs uppercase tracking-[0.2em] ${
                      isActive
                        ? 'is-active border-fg-24 bg-fg-04 text-fg-96'
                        : 'border-fg-08 text-fg-64'
                    }`}
                  >
                    <span className="font-semibold">{mode.name}</span>
                    <span className="text-[10px] text-fg-48">
                      {mode.tags[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded border border-fg-08 bg-surface-primary p-4">
            <p className="control-heading">Selected</p>
            <p className="mt-2 text-base font-semibold text-fg-96">{activeMode.name}</p>
            <p className="mt-1 text-sm text-fg-64">{activeMode.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeMode.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-fg-08 bg-surface-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-fg-64"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default LeftPanel
