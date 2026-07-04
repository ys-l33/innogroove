import { useEffect, useState } from 'react'
import type { Track } from '../data/tracks'
import { TrackRow } from './TrackRow'

interface Props {
  prompt: string
  tracks: Track[]
  round: number
  onRegenerate: (likedIds: string[], removedIds: string[]) => void
  onConfirm: (finalTracks: Track[]) => void
  onRestart: () => void
}

export function PlaylistScreen({ prompt, tracks, round, onRegenerate, onConfirm, onRestart }: Props) {
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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <button type="button" onClick={onRestart} className="mb-3 text-xs text-muted hover:text-lime">
            ← 새 프롬프트로 다시 시작
          </button>
          <p className="text-xs uppercase tracking-wide text-lime">
            {round === 1 ? '추천 결과' : `재추천 결과 · ${round - 1}회 반영`}
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">"{prompt}"</h1>
          <p className="mt-1 text-sm text-muted">
            마음에 드는 곡은 하트, 빼고 싶은 곡은 X를 눌러주세요. 총 {remainingCount}곡
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
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
          <p className="text-sm text-white">이 플레이리스트로 노래를 재생할까요?</p>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => onRegenerate([...likedIds], [...removedIds])}
              className="flex-1 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-pink/50 hover:text-pink sm:flex-none"
            >
              아니요, 다시 추천
            </button>
            <button
              type="button"
              onClick={() => onConfirm(tracks.filter((t) => !removedIds.has(t.id)))}
              className="flex-1 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-soft sm:flex-none"
            >
              네, 좋아요
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
