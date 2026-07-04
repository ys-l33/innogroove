import { useState } from 'react'

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
}

const COLORS = ['#a8f11b', '#d4ff6e', '#f137b3', '#ff7fd1', '#ffffff']

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = 60 + Math.random() * 150
    return {
      id: `${Date.now()}-${i}-${Math.random()}`,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 30,
      rot: Math.random() * 720 - 360,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      dur: 0.7 + Math.random() * 0.5,
      delay: Math.random() * 0.12,
      round: Math.random() > 0.5,
    }
  })
}

interface Props {
  label: string
  onDone: () => void
  className?: string
}

export function ConfettiButton({ label, onDone, className }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [popping, setPopping] = useState(false)

  function handleClick() {
    if (popping) return
    setPopping(true)
    setParticles(makeParticles(32))
    setTimeout(() => onDone(), 750)
    setTimeout(() => {
      setParticles([])
      setPopping(false)
    }, 1500)
  }

  return (
    <span className="relative inline-block w-full">
      <button type="button" onClick={handleClick} className={className}>
        {label}
      </button>
      {particles.map((p) => {
        const style = {
          width: p.size,
          height: p.size,
          background: p.bg,
          borderRadius: p.round ? '9999px' : '2px',
          '--tx': `${p.tx}px`,
          '--ty': `${p.ty}px`,
          '--rot': `${p.rot}deg`,
          '--dur': `${p.dur}s`,
          '--delay': `${p.delay}s`,
        } as React.CSSProperties
        return <span key={p.id} className="confetti-particle pointer-events-none" style={style} />
      })}
    </span>
  )
}
