import type { CuratedSelection } from '../data/curatedThemes'
import { PromptSearch } from './PromptSearch'
import { CuratedSection } from './CuratedSection'

interface Props {
  onCustomSubmit: (prompt: string) => void
  onCuratedSelect: (selection: CuratedSelection) => void
}

export function SearchPage({ onCustomSubmit, onCuratedSelect }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="mesh-bg pointer-events-none fixed inset-0 -z-10" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-4 py-1 text-xs tracking-wide text-lime uppercase">
            Focus Flow
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            오늘 작업에 어울리는 플레이리스트를
            <br />
            만들어드릴게요
          </h1>
          <p className="mt-3 text-sm text-muted">
            직접 프롬프트를 적어도 되고, 오른쪽 큐레이션 카드를 눌러도 돼요.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,2fr)_1px_minmax(0,3fr)] md:gap-8">
          <section className="md:sticky md:top-8">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full border border-lime/30 bg-lime/5 px-3 py-1 text-xs uppercase tracking-wide text-lime">
                1
              </span>
              <h2 className="text-sm font-semibold text-white">커스텀 프롬프트로 만들기</h2>
            </div>
            <p className="mb-6 text-sm text-muted">지금 어떤 피드백을 받고 무슨 작업 중이신가요?</p>
            <div className="glass rounded-3xl border border-line p-6">
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
