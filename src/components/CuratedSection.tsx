import { CURATED_THEMES, type CuratedSelection } from '../data/curatedThemes'
import { CuratedCard } from './CuratedCard'

interface Props {
  onSelect: (selection: CuratedSelection) => void
}

export function CuratedSection({ onSelect }: Props) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-full border border-pink/30 bg-pink/5 px-3 py-1 text-xs uppercase tracking-wide text-pink">
          2
        </span>
        <h2 className="text-sm font-semibold text-white">컨셉 큐레이션 — 광고인의 하루</h2>
      </div>
      <p className="mb-6 text-sm text-muted">직접 안 써도 돼요. 지금 상황에 맞는 카드 하나만 눌러보세요.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CURATED_THEMES.map((theme) => (
          <CuratedCard key={theme.id} theme={theme} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
