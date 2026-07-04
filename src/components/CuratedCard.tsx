import type { CuratedSelection, CuratedTheme } from '../data/curatedThemes'
import { ConfettiButton } from './ConfettiButton'

interface Props {
  theme: CuratedTheme
  onSelect: (selection: CuratedSelection) => void
}

export function CuratedCard({ theme, onSelect }: Props) {
  if (theme.variant === 'file-hell') {
    return (
      <div className="rounded-3xl border border-line bg-surface p-5 sm:col-span-2">
        <CardHeader theme={theme} />
        <div className="mt-4 flex flex-col gap-2">
          {theme.fileStates?.map((fs, i) => (
            <button
              key={fs.id}
              type="button"
              onClick={() => onSelect({ displayTitle: fs.displayTitle, matchPrompt: fs.matchPrompt })}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-raised px-4 py-3 text-left transition hover:border-lime/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-lg">📄</span>
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm text-white">{fs.filename}</p>
                  <p className="text-xs text-muted">{fs.vibe}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden text-xs text-lime opacity-0 transition group-hover:opacity-100 sm:inline">
                  재생하기
                </span>
                <div className="flex gap-0.5" aria-hidden>
                  {theme.fileStates!.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`h-1.5 w-3 rounded-full ${dotIndex <= i ? 'bg-lime' : 'bg-line'}`}
                    />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (theme.variant === 'boost') {
    return (
      <div className="boost-card relative overflow-hidden rounded-3xl border border-pink/40 bg-gradient-to-br from-pink/15 via-surface to-surface p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink/20 blur-3xl" />
        <CardHeader theme={theme} />
        <button
          type="button"
          onClick={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
          className="relative mt-5 w-full rounded-full bg-pink px-5 py-3.5 text-sm font-bold tracking-wide text-black transition hover:bg-pink-soft active:scale-[0.98]"
        >
          {theme.ctaLabel}
        </button>
      </div>
    )
  }

  if (theme.variant === 'trend') {
    return (
      <div className="rounded-3xl border border-line bg-surface p-6">
        <CardHeader theme={theme} />
        <button
          type="button"
          onClick={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
          className="mt-5 w-full rounded-full border border-lime/50 bg-lime/10 px-5 py-3 text-sm font-semibold text-lime transition hover:bg-lime/20"
        >
          {theme.ctaLabel}
        </button>
      </div>
    )
  }

  // celebrate
  return (
    <div className="rounded-3xl border border-line bg-surface p-6">
      <CardHeader theme={theme} />
      <ConfettiButton
        label={theme.ctaLabel!}
        onDone={() => onSelect({ displayTitle: theme.displayTitle!, matchPrompt: theme.matchPrompt! })}
        className="mt-5 w-full rounded-full bg-lime px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-soft active:scale-[0.98]"
      />
    </div>
  )
}

function CardHeader({ theme }: { theme: CuratedTheme }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{theme.emoji}</span>
        <h3 className="text-base font-semibold text-white">{theme.title}</h3>
      </div>
      <p
        className={`mt-1 text-xs font-medium ${theme.accent === 'pink' ? 'text-pink' : 'text-lime'}`}
      >
        {theme.tagline}
      </p>
      <p className="mt-2 text-sm text-muted">{theme.description}</p>
    </div>
  )
}
