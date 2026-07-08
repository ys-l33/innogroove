import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Track } from '../data/tracks'
import { buildTrackLinks, platformHomeUrl, platformLabel, type Platform, type VersionPreference } from '../lib/platformLinks'
import { getPostposition } from '../lib/korean'

const PREVIEW_COUNT = 4
const MINUTES_PER_TRACK = 3.5

const COVER_THEMES = [
  { from: '#a8f11b', to: '#f137b3' },
  { from: '#f137b3', to: '#8b5cf6' },
  { from: '#38bdf8', to: '#a8f11b' },
  { from: '#fbbf24', to: '#f137b3' },
  { from: '#34d399', to: '#38bdf8' },
]

function pickNextThemeIndex(current: number) {
  if (COVER_THEMES.length <= 1) return 0
  let next = current
  while (next === current) next = Math.floor(Math.random() * COVER_THEMES.length)
  return next
}

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
  const [displayTitle, setDisplayTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState(title)
  const [coverThemeIndex, setCoverThemeIndex] = useState(0)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const links = buildTrackLinks(tracks, platform, preference)
  const previewTracks = tracks.slice(0, PREVIEW_COUNT)
  const estimatedMinutes = Math.round(tracks.length * MINUTES_PER_TRACK)
  const coverTheme = COVER_THEMES[coverThemeIndex]

  const avgEnergy = tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length
  const groovePercent = Math.round((avgEnergy / 10) * 100)
  const chillPercent = 100 - groovePercent
  const bpmRange = avgEnergy >= 7 ? '128 - 140' : avgEnergy >= 4 ? '95 - 115' : '70 - 90'

  useEffect(() => {
    if (isEditingTitle) titleInputRef.current?.focus()
  }, [isEditingTitle])

  function startEditingTitle() {
    setDraftTitle(displayTitle)
    setIsEditingTitle(true)
  }

  function commitTitle() {
    const trimmed = draftTitle.trim()
    setDisplayTitle(trimmed || displayTitle)
    setIsEditingTitle(false)
  }

  function handleTitleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false)
    }
  }

  function shuffleCover() {
    setCoverThemeIndex((prev) => pickNextThemeIndex(prev))
  }

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
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={shuffleCover}
            aria-label="커버 아트 셔플"
            style={{ '--cover-from': coverTheme.from, '--cover-to': coverTheme.to } as CSSProperties}
            className="cover-art group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03]"
          >
            <span className="absolute bottom-1.5 right-2 text-[9px] font-bold tracking-wide text-black/70">
              INNOGROOVE
            </span>
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xl opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
              🔀
            </span>
          </button>
          <div className="min-w-0 flex-1">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={handleTitleKeyDown}
                className="w-full min-w-0 rounded-lg border border-lime/40 bg-black/30 px-2 py-0.5 text-lg font-bold text-white outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={startEditingTitle}
                className="group/title flex min-w-0 max-w-full items-center gap-1.5 text-left"
              >
                <span className="truncate text-lg font-bold text-white">{displayTitle}</span>
                <span className="shrink-0 text-xs opacity-60 transition group-hover/title:opacity-100">✏️</span>
              </button>
            )}
            <span className="mt-1.5 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
              {tracks.length} Tracks • {estimatedMinutes} Min
            </span>

            <div className="mt-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-xs text-gray-400">Groove</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${groovePercent}%` }} />
                </div>
                <span className="w-9 shrink-0 text-right text-xs tabular-nums text-gray-400">{groovePercent}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-xs text-gray-400">Chill</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-pink" style={{ width: `${chillPercent}%` }} />
                </div>
                <span className="w-9 shrink-0 text-right text-xs tabular-nums text-gray-400">{chillPercent}%</span>
              </div>
              <p className="text-xs text-gray-400">BPM {bpmRange}</p>
            </div>
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
            className="neon-lime mx-auto w-fit rounded-full bg-lime px-10 py-3 text-center text-base font-bold text-black transition hover:scale-105 hover:bg-lime-soft"
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
