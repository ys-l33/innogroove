import type { CuratedSelection, CuratedTheme } from '../data/curatedThemes'
import { ConfettiButton } from './ConfettiButton'

interface Props {
  theme: CuratedTheme
  onSelect: (selection: CuratedSelection) => void
}

export function CuratedCard({ theme, onSelect }: Props) {
  if (theme.variant === 'file-hell') {
    return (
      <div className="curated-card hover-glow-lime glass flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-5">
        <CardHeader theme={theme} />
        <div className="flex flex-1 flex-col gap-1.5">
          {theme.fileStates?.map((fs, i) => (
            <button
              key={fs.id}
              type="button"
              onClick={() => onSelect({ displayTitle: fs.displayTitle, matchPrompt: fs.matchPrompt })}
              className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-black/20 px-3 py-2 text-left transition hover:border-lime/50"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-sm">📄</span>
                <p className="truncate font-mono text-xs text-white">{fs.filename}</p>
              </div>
              <div className="flex shrink-0 gap-0.5" aria-hidden>
                {theme.fileStates!.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`h-1.5 w-2.5 rounded-full ${dotIndex <= i ? 'bg-lime' : 'bg-line'}`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (theme.variant === 'boost') {
    return (
      <div className="boost-card curated-card glass relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-pink/40 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink/25 blur-3xl" />
        <CardHeader theme={theme} />
        <button
          type="button"
          onClick={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
          className="neon-pink relative mt-auto w-full rounded-full bg-pink px-5 py-3 text-sm font-bold tracking-wide text-black transition hover:bg-pink-soft active:scale-[0.98]"
        >
          {theme.ctaLabel}
        </button>
      </div>
    )
  }

  if (theme.variant === 'trend') {
    return (
      <div className="curated-card hover-glow-lime glass flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-5">
        <CardHeader theme={theme} />
        <button
          type="button"
          onClick={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
          className="neon-lime mt-auto w-full rounded-full border border-lime/50 bg-lime/10 px-5 py-3 text-sm font-semibold text-lime transition hover:bg-lime/20"
        >
          {theme.ctaLabel}
        </button>
      </div>
    )
  }

  // celebrate
  return (
    <div className="curated-card hover-glow-lime glass flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-5">
      <CardHeader theme={theme} />
      <ConfettiButton
        label={theme.ctaLabel!}
        onDone={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
        wrapperClassName="mt-auto"
        className="neon-lime w-full rounded-full bg-lime px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-soft active:scale-[0.98]"
      />
    </div>
  )
}

function CardHeader({ theme }: { theme: CuratedTheme }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="text-xl">{theme.emoji}</span>
        <h3 className="text-sm font-semibold text-white">{theme.title}</h3>
      </div>
      <p
        className={`mt-1 text-xs font-medium ${theme.accent === 'pink' ? 'text-pink' : 'text-lime'}`}
      >
        {theme.tagline}
      </p>
      <p className="mt-2 text-xs text-muted">{theme.description}</p>
    </div>
  )
}
