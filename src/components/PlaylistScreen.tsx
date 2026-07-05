import { useEffect, useState } from 'react'
import type { Track } from '../data/tracks'
import { TrackRow } from './TrackRow'

interface Props {
  title: string
  origin: 'custom' | 'curated'
  tracks: Track[]
  round: number
  onRegenerate: (likedIds: string[], removedIds: string[]) => void
  onConfirm: (finalTracks: Track[]) => void
  onRestart: () => void
}

export function PlaylistScreen({ title, origin, tracks, round, onRegenerate, onConfirm, onRestart }: Props) {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLikedIds((prev) => new Set([...prev].filter((id) => tracks.some((t) => t.id === id))))
    setRemovedIds((prev) => new Set([...prev].filter((id) => tracks.some((t) => t.id === id))))
  }, [tracks])

  function toggleLike(id: string) {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setRemovedIds((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function toggleRemove(id: string) {
    setRemovedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setLikedIds((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const remainingCount = tracks.length - removedIds.size

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pb-32 pt-10">
      <div className="mb-6">
        <button type="button" onClick={onRestart} className="mb-3 text-xs text-muted hover:text-lime">
          ← 새 프롬프트로 다시 시작
        </button>

        <div className="tinted-glass rounded-2xl border border-white/15 border-l-4 border-l-lime px-5 py-4">
          <span className="inline-block rounded-full bg-lime/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-lime">
            Generated Vibe
          </span>
          <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            {origin === 'custom' ? `"${title}"` : title}
          </h1>
          <p className="mt-1 text-xs uppercase tracking-wide text-lime">
            {origin === 'curated' ? '컨셉 큐레이션' : '추천 결과'}
            {round > 1 ? ` · 재추천 ${round - 1}회 반영` : ''}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">마음에 드는 곡은 하트, 빼고 싶은 곡은 X를 눌러주세요.</p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full border border-pink/40 bg-pink/5 px-2.5 py-1 text-xs font-bold text-pink tabular-nums">
              ❤️ {likedIds.size}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-bold text-muted tabular-nums">
              ❌ {removedIds.size}
            </span>
            <span className="rounded-full border border-lime/40 px-2.5 py-1 text-xs font-bold text-lime tabular-nums">
              남은 곡 {remainingCount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            liked={likedIds.has(track.id)}
            removed={removedIds.has(track.id)}
            onToggleLike={toggleLike}
            onToggleRemove={toggleRemove}
          />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-white">이대로 플레이리스트를 완성할까요?</p>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => onRegenerate([...likedIds], [...removedIds])}
              className="flex-1 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-pink/50 hover:text-pink sm:flex-none"
            >
              아니요, 취향 반영해 재생성
            </button>
            <button
              type="button"
              onClick={() => onConfirm(tracks.filter((t) => !removedIds.has(t.id)))}
              className="neon-lime flex-1 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-soft sm:flex-none"
            >
              네, 좋아요
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
