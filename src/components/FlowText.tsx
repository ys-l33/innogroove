import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function FlowText({ children }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    ref.current?.style.setProperty('--flow-x', `${x}%`)
  }

  function handleMouseLeave() {
    ref.current?.style.setProperty('--flow-x', '50%')
  }

  return (
    <span
      ref={ref}
      className="flow-text"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  )
}
