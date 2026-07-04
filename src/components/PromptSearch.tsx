import { useState } from 'react'

const EXAMPLES = [
  {
    label: '🤯 아이디어 고갈, 뇌파 자극 딥 하우스',
    prompt: '아이데이션 회의 30분 전인데 머리가 하얗게 멈췄을 때 듣는 뇌파 자극 딥 하우스',
  },
  {
    label: "🔥 '느낌적인 느낌이 대체 뭐죠?' 분노 조절 메탈",
    prompt: "클라이언트가 '느낌적인 느낌'으로 수정해 달라고 해서, 깊은 화를 누르며 작업할 때 듣는 강렬한 메탈",
  },
  {
    label: '🌙 새벽 2시, 홀로 사무실에 남은 나를 위로해줄 인디',
    prompt: '새벽 2시, 사무실에 나 혼자 남아 제안서 폰트 자간과 줄 간격 맞출 때 위로가 되는 잔잔한 인디 음악',
  },
]

interface Props {
  onSubmit: (prompt: string) => void
}

export function PromptSearch({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const prompt = value.trim()
    if (!prompt) return
    onSubmit(prompt)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="group relative flex items-center rounded-full border border-line bg-black/30 px-3 py-2 shadow-[0_0_0_1px_rgba(168,241,27,0)] transition focus-within:border-lime focus-within:shadow-[0_0_0_3px_rgba(168,241,27,0.15)]">
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
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-white placeholder:text-muted-soft focus:outline-none"
          />
          <button
            type="submit"
            className="neon-lime shrink-0 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-soft active:scale-95"
          >
            플레이리스트 만들기
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.prompt}
            type="button"
            onClick={() => {
              setValue(ex.prompt)
              onSubmit(ex.prompt)
            }}
            className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-pink/50 hover:bg-pink/10 hover:text-pink"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  )
}
