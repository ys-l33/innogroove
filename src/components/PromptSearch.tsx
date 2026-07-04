import { useEffect, useState } from 'react'

const EXAMPLES = [
  '펑키함을 살린 밴드 노래 플레이리스트',
  '비가 오는 날 슬프기보단 기쁜 마음으로 들을 수 있는 프랑스 노래 플레이리스트',
  '야근할 때 집중력 올려주는 로파이 플레이리스트',
  '드라이브하기 좋은 신나는 시티팝 플레이리스트',
  '카페에서 듣기 좋은 잔잔한 재즈 플레이리스트',
]

interface Props {
  onSubmit: (prompt: string) => void
}

export function PromptSearch({ onSubmit }: Props) {
  const [value, setValue] = useState('')
  const [exampleIndex, setExampleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setExampleIndex((i) => (i + 1) % EXAMPLES.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const prompt = value.trim() || EXAMPLES[exampleIndex]
    onSubmit(prompt)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="group relative flex items-center rounded-full border border-line bg-surface px-3 py-2 shadow-[0_0_0_1px_rgba(168,241,27,0)] transition focus-within:border-lime focus-within:shadow-[0_0_0_3px_rgba(168,241,27,0.15)]">
          <svg
            className="ml-3 h-5 w-5 shrink-0 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={EXAMPLES[exampleIndex]}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-white placeholder:text-muted-soft focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-soft active:scale-95"
          >
            플레이리스트 만들기
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.slice(0, 3).map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => onSubmit(ex)}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-pink/50 hover:text-pink"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
