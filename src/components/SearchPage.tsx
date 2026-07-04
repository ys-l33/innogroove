import type { CuratedSelection } from '../data/curatedThemes'
import { PromptSearch } from './PromptSearch'
import { CuratedSection } from './CuratedSection'

interface Props {
  onCustomSubmit: (prompt: string) => void
  onCuratedSelect: (selection: CuratedSelection) => void
}

export function SearchPage({ onCustomSubmit, onCuratedSelect }: Props) {
  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-6 pb-2 pt-16 text-center sm:pt-20">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-4 py-1 text-xs tracking-wide text-lime uppercase">
          Focus Flow
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          오늘 작업에 어울리는 플레이리스트를 만들어드릴게요
        </h1>
        <p className="mt-3 text-sm text-muted">
          직접 프롬프트를 적어도 되고, 아래 큐레이션 카드를 눌러도 돼요.
        </p>
      </div>

      <section className="mx-auto mt-10 max-w-2xl px-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full border border-lime/30 bg-lime/5 px-3 py-1 text-xs uppercase tracking-wide text-lime">
            1
          </span>
          <h2 className="text-sm font-semibold text-white">커스텀 프롬프트로 만들기</h2>
        </div>
        <PromptSearch onSubmit={onCustomSubmit} />
      </section>

      <div className="mx-auto my-14 max-w-4xl px-6">
        <div className="h-px w-full bg-line" />
      </div>

      <section className="mx-auto max-w-4xl px-6">
        <CuratedSection onSelect={onCuratedSelect} />
      </section>
    </div>
  )
}
