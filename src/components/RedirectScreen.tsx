import { useState } from 'react'
import type { Track } from '../data/tracks'
import { buildTrackLinks, platformHomeUrl, platformLabel, type Platform, type VersionPreference } from '../lib/platformLinks'
import { getPostposition } from '../lib/korean'

interface Props {
  tracks: Track[]
  platform: Platform
  preference: VersionPreference
  onBack: () => void
  onRestart: () => void
}

export function RedirectScreen({ tracks, platform, preference, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState(false)
  const links = buildTrackLinks(tracks, platform, preference)

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

      <div className="mt-16 flex flex-1 flex-col items-center justify-center gap-4">
        <a
          href={platformHomeUrl(platform)}
          target="_blank"
          rel="noopener noreferrer"
          className="neon-lime w-full max-w-xs rounded-full bg-lime px-8 py-5 text-center text-lg font-bold text-black transition hover:scale-105 hover:bg-lime-soft"
        >
          {platformLabel(platform)}에서 바로 듣기
        </a>
        <button type="button" onClick={copyList} className="text-xs text-muted transition hover:text-white">
          {copied ? '복사됨!' : '텍스트로 곡 목록 복사하기'}
        </button>
      </div>

      <button type="button" onClick={onRestart} className="mt-10 w-fit text-xs text-muted hover:text-white">
        새 플레이리스트 만들러 가기
      </button>
    </div>
  )
}
