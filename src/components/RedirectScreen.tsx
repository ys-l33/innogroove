import { useState } from 'react'
import type { Track } from '../data/tracks'
import { buildTrackLinks, platformLabel, type Platform, type VersionPreference } from '../lib/platformLinks'
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

  function openAll() {
    links.forEach(({ url }) => window.open(url, '_blank', 'noopener'))
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
        플랫폼 정책상 로그인 없이 플레이리스트를 바로 만들 수는 없어서, 각 곡의 검색 결과 페이지로 연결해드려요.
        열린 탭에서 마음에 드는 트랙을 플레이리스트에 추가해주세요.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={openAll}
          className="neon-lime rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-soft"
        >
          {links.length}곡 전체 새 탭으로 열기
        </button>
        <button
          type="button"
          onClick={copyList}
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-pink/50 hover:text-pink"
        >
          {copied ? '복사됨!' : '곡 목록 텍스트로 복사'}
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        {links.map(({ track, query, url }, i) => (
          <a
            key={track.id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition hover:border-lime/40"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {i + 1}. {query}
              </p>
            </div>
            <span className="shrink-0 text-xs text-lime">열기 →</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 w-fit text-xs text-muted hover:text-white"
      >
        새 플레이리스트 만들러 가기
      </button>
    </div>
  )
}
