import { useState } from 'react'
import type { Track } from '../data/tracks'
import type { Platform, VersionPreference } from '../lib/platformLinks'

const VERSION_OPTIONS: { value: VersionPreference; title: string; desc: string }[] = [
  { value: 'original', title: '오리지널 버전 그대로', desc: '발매 당시 원곡 그대로 재생해요' },
  { value: 'remaster', title: '리마스터 버전 우선 적용', desc: '리마스터 버전이 있는 곡은 그 버전으로 바꿔서 재생해요' },
  { value: 'live', title: '라이브 앨범 버전 우선 적용', desc: '라이브 버전이 있는 곡은 현장감 있는 라이브로 재생해요' },
]

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: 'youtube-music', label: '유튜브 뮤직' },
  { value: 'spotify', label: '스포티파이' },
  { value: 'apple-music', label: '애플 뮤직' },
]

interface Props {
  tracks: Track[]
  onProceed: (preference: VersionPreference, platform: Platform) => void
  onBack: () => void
}

export function OptionsScreen({ tracks, onProceed, onBack }: Props) {
  const [preference, setPreference] = useState<VersionPreference>('original')
  const [platform, setPlatform] = useState<Platform | null>(null)

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pb-16 pt-10">
      <button type="button" onClick={onBack} className="mb-6 w-fit text-xs text-muted hover:text-lime">
        ← 플레이리스트로 돌아가기
      </button>

      <h1 className="text-xl font-semibold text-white sm:text-2xl">재생 옵션을 선택해주세요</h1>
      <p className="mt-1 text-sm text-muted">총 {tracks.length}곡에 적용할 버전과 이동할 플랫폼을 골라주세요</p>

      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-lime">버전 우선순위</h2>
        <div className="flex flex-col gap-2.5">
          {VERSION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPreference(opt.value)}
              className={`flex flex-col items-start rounded-2xl border px-4 py-3 text-left transition ${
                preference === opt.value ? 'border-lime bg-lime/10' : 'border-line bg-surface hover:border-line/80'
              }`}
            >
              <span className={`text-sm font-medium ${preference === opt.value ? 'text-lime' : 'text-white'}`}>
                {opt.title}
              </span>
              <span className="mt-0.5 text-xs text-muted">{opt.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-pink">이동할 플랫폼</h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {PLATFORM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPlatform(opt.value)}
              className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                platform === opt.value
                  ? 'border-pink bg-pink/10 text-pink'
                  : 'border-line bg-surface text-white hover:border-pink/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        disabled={!platform}
        onClick={() => platform && onProceed(preference, platform)}
        className="neon-lime mt-10 w-full rounded-full bg-lime px-5 py-3.5 text-sm font-semibold text-black transition enabled:hover:bg-lime-soft disabled:cursor-not-allowed disabled:opacity-30"
      >
        선택한 플랫폼으로 이동하기
      </button>
    </div>
  )
}
