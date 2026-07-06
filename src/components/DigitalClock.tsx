import { useEffect, useState } from 'react'

function formatTime(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const period = date.getHours() >= 12 ? 'PM' : 'AM'
  const hours12 = date.getHours() % 12 || 12
  return {
    hours: pad(hours12),
    minutes: pad(date.getMinutes()),
    seconds: pad(date.getSeconds()),
    period,
  }
}

interface Props {
  isHome: boolean
}

export function DigitalClock({ isHome }: Props) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const { hours, minutes, seconds, period } = formatTime(now)

  return (
    <div
      className={`fixed left-8 z-50 flex flex-col items-start gap-1 rounded-2xl bg-black/20 px-3 py-2 backdrop-blur-sm transition-all duration-300 ease-out ${
        isHome ? 'bottom-8' : 'bottom-24'
      }`}
    >
      <span className="text-[10px] font-light tracking-wide text-muted">time is ticking..</span>
      <span className="digital-clock flex items-baseline text-sm text-white/80">
        <span>{hours}</span>
        <span className="clock-colon">:</span>
        <span>{minutes}</span>
        <span className="clock-colon">:</span>
        <span>{seconds}</span>
        <span className="ml-1.5 text-[10px] text-white/50">{period}</span>
      </span>
    </div>
  )
}
