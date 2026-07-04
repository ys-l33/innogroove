import { useState, type ReactNode } from 'react'

interface Particle {
  id: string
  tx: number
  ty: number
  rot: number
  bg: string
  size: number
  dur: number
  delay: number
  round: boolean
  emoji?: string
}

const COLORS = ['#a8f11b', '#d4ff6e', '#f137b3', '#ff7fd1', '#ffffff']

function makeParticles(count: number, emojis?: string[], spread = 1): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = (60 + Math.random() * 150) * spread
    return {
      id: `${Date.now()}-${i}-${Math.random()}`,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 30,
      rot: Math.random() * 720 - 360,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: emojis ? 16 + Math.random() * 10 : 6 + Math.random() * 8,
      dur: 0.7 + Math.random() * 0.5,
      delay: Math.random() * 0.12,
      round: Math.random() > 0.5,
      emoji: emojis ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
    }
  })
}

interface Props {
  children: ReactNode
  onDone: () => void
  className?: string
  wrapperClassName?: string
  /** Emoji set for a themed particle burst. Omit for the default confetti squares. */
  emojis?: string[]
  particleCount?: number
  /** Scales how far particles travel from center. */
  spread?: number
  /** Delay (ms) before onDone fires, so the effect is visible before navigating away. */
  delay?: number
}

export function EffectButton({
  children,
  onDone,
  className,
  wrapperClassName,
  emojis,
  particleCount = 32,
  spread = 1,
  delay = 750,
}: Props) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [popping, setPopping] = useState(false)

  function handleClick() {
    if (popping) return
    setPopping(true)
    setParticles(makeParticles(particleCount, emojis, spread))
    setTimeout(() => onDone(), delay)
    setTimeout(() => {
      setParticles([])
      setPopping(false)
    }, delay + 750)
  }

  return (
    <span className={`relative inline-block w-full ${wrapperClassName ?? ''}`}>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
      {particles.map((p) => {
        const style = {
          width: p.emoji ? undefined : p.size,
          height: p.emoji ? undefined : p.size,
          fontSize: p.emoji ? p.size : undefined,
          lineHeight: p.emoji ? 1 : undefined,
          background: p.emoji ? undefined : p.bg,
          borderRadius: p.emoji ? undefined : p.round ? '9999px' : '2px',
          '--tx': `${p.tx}px`,
          '--ty': `${p.ty}px`,
          '--rot': `${p.rot}deg`,
          '--dur': `${p.dur}s`,
          '--delay': `${p.delay}s`,
        } as React.CSSProperties
        return (
          <span key={p.id} className="confetti-particle pointer-events-none" style={style}>
            {p.emoji}
          </span>
        )
      })}
    </span>
  )
}
