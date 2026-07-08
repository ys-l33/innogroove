import { useState } from 'react'
import type { Track } from '../data/tracks'
import { buildTrackLinks, platformHomeUrl, platformLabel, type Platform, type VersionPreference } from '../lib/platformLinks'
import { getPostposition } from '../lib/korean'

const PREVIEW_COUNT = 4
const MINUTES_PER_TRACK = 3.5

interface Props {
  title: string
  tracks: Track[]
  platform: Platform
  preference: VersionPreference
  onBack: () => void
  onRestart: () => void
}

export function RedirectScreen({ title, tracks, platform, preference, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState(false)
  const links = buildTrackLinks(tracks, platform, preference)
  const previewTracks = tracks.slice(0, PREVIEW_COUNT)
  const estimatedMinutes = Math.round(tracks.length * MINUTES_PER_TRACK)

  async function copyList() {
    const text = links.map(({ query }, i) => `${i + 1}. ${query}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 접근 실패 시 조용히 무시 (권한 문제 등)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pb-16 pt-10">
      <button type="button" onClick={onBack} className="mb-6 w-fit text-xs text-muted hover:text-lime">
        ← 옵션 다시 선택하기
      </button>

      <h1 className="text-xl font-semibold text-white sm:text-2xl">
        {getPostposition(platformLabel(platform))} 이동할 준비가 됐어요
      </h1>
      <p className="mt-2 text-sm text-muted">
        당신의 순간을 위한 플레이리스트가 준비되었어요. 지금 바로 플레이 버튼을 눌러 리듬을 타보세요!
      </p>

      <div className="tinted-glass mt-8 rounded-3xl border border-white/15 p-6">
        <div className="flex items-center gap-4">
          <div className="cover-art relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-lg">
            <span className="absolute bottom-1.5 right-2 text-[9px] font-bold tracking-wide text-black/70">
              INNOGROOVE
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-white">{title}</p>
            <span className="mt-1.5 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
              {tracks.length} Tracks • {estimatedMinutes} Min
            </span>
          </div>
        </div>

        <div className="track-preview-fade mt-5 flex flex-col gap-2">
          {previewTracks.map((track, i) => (
            <div key={track.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
              <span className="w-4 shrink-0 text-center text-xs tabular-nums text-muted-soft">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{track.title}</p>
                <p className="truncate text-xs text-muted">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="-mt-3 flex flex-col items-center gap-3">
          <a
            href={platformHomeUrl(platform)}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-lime w-full max-w-xs rounded-full bg-lime px-8 py-4 text-center text-base font-bold text-black transition hover:scale-105 hover:bg-lime-soft"
          >
            {platformLabel(platform)}에서 바로 듣기
          </a>
          <button type="button" onClick={copyList} className="text-xs text-muted transition hover:text-white">
            {copied ? '복사됨!' : '텍스트로 곡 목록 복사하기'}
          </button>
        </div>
      </div>

      <button type="button" onClick={onRestart} className="mt-10 w-fit text-xs text-muted hover:text-white">
        새 플레이리스트 만들러 가기
      </button>
    </div>
  )
}
