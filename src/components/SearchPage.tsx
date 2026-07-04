import type { CuratedSelection } from '../data/curatedThemes'
import { PromptSearch } from './PromptSearch'
import { CuratedSection } from './CuratedSection'
import { MarqueeBanner } from './MarqueeBanner'
import { FlowText } from './FlowText'

interface Props {
  onCustomSubmit: (prompt: string) => void
  onCuratedSelect: (selection: CuratedSelection) => void
}

export function SearchPage({ onCustomSubmit, onCuratedSelect }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="mesh-bg pointer-events-none fixed inset-0 -z-10" />
      <div className="noise-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/5 px-4 py-1 text-xs tracking-wide">
            <span className="font-bold text-lime">INNOGROOVE</span>
            <span className="font-light text-white/60">: The Playlist for Movers</span>
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find your <FlowText>groove</FlowText>,
            <br />
            Make a <FlowText>move</FlowText>.
          </h1>
          <p className="mt-3 text-sm text-muted">Type your vibe or pick a curation card below.</p>
        </div>

        <div className="my-10">
          <MarqueeBanner />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,2fr)_1px_minmax(0,3fr)] md:gap-8">
          <section className="md:sticky md:top-8">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full border border-lime/30 bg-lime/5 px-3 py-1 text-xs uppercase tracking-wide text-lime">
                1
              </span>
              <h2 className="text-2xl font-extrabold text-white">커스텀 프롬프트로 만들기</h2>
            </div>
            <p className="mb-6 text-sm text-muted">지금 어떤 피드백을 받고 무슨 작업 중이신가요?</p>
            <div className="glass rounded-3xl border border-white/10 p-6">
              <PromptSearch onSubmit={onCustomSubmit} />
            </div>
          </section>

          <div aria-hidden className="hidden self-stretch bg-white/10 md:block" />

          <section className="@container">
            <CuratedSection onSelect={onCuratedSelect} />
          </section>
        </div>
      </div>
    </div>
  )
}
