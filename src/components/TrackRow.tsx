import type { Track } from '../data/tracks'

const VERSION_LABEL: Record<string, string> = {
  original: '오리지널',
  remaster: '리마스터',
  live: '라이브',
}

interface Props {
  track: Track
  index: number
  liked: boolean
  removed: boolean
  onToggleLike: (id: string) => void
  onToggleRemove: (id: string) => void
}

export function TrackRow({ track, index, liked, removed, onToggleLike, onToggleRemove }: Props) {
  return (
    <div
      className={`relative flex items-center gap-4 rounded-2xl border px-4 py-3 ${
        liked ? 'track-glow-pink z-10 border-pink/50 bg-pink/5' : 'z-0 border-line bg-surface'
      }`}
    >
      <span className="w-6 shrink-0 text-center text-sm text-muted-soft tabular-nums">{index + 1}</span>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-bold ${removed ? 'text-muted line-through' : 'text-white'}`}>
          {track.title}
        </p>
        <p className="truncate text-xs font-light text-muted-soft">{track.artist}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {track.genre.slice(0, 2).map((g) => (
            <span key={g} className="rounded-full bg-lime/10 px-2 py-0.5 text-[10px] font-medium text-lime">
              #{g}
            </span>
          ))}
          {track.mood.slice(0, 2).map((m) => (
            <span key={m} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted">
              {m}
            </span>
          ))}
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-soft">
            {track.versions.map((v) => VERSION_LABEL[v]).join(' · ')}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="좋아요"
          onClick={() => onToggleLike(track.id)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
            liked
              ? 'border-pink bg-pink text-black'
              : 'border-line text-muted hover:border-pink/60 hover:text-pink'
          }`}
        >
          <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.6l-1.45-1.32C5.4 14.86 2 11.77 2 8.06 2 5.14 4.42 2.75 7.4 2.75c1.74 0 3.41.8 4.6 2.06a6.3 6.3 0 014.6-2.06c2.98 0 5.4 2.39 5.4 5.31 0 3.71-3.4 6.8-8.55 11.24L12 20.6z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="삭제"
          onClick={() => onToggleRemove(track.id)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
            removed
              ? 'border-muted-soft bg-muted-soft text-white'
              : 'border-line text-muted hover:border-white/40 hover:text-white'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {removed && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/15 backdrop-blur-md">
          <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-black shadow-lg">
            <span aria-hidden>🛇</span>
            제외됨
          </span>
        </div>
      )}
    </div>
  )
}
