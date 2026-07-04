const PHRASE = '✨ inspiration loading... • set the mood • creative frequency • ride the wave 🌊'
const REPEATED = Array.from({ length: 6 }, () => PHRASE).join('   ')

export function MarqueeBanner() {
  return (
    <div className="marquee-band relative left-1/2 -ml-[50vw] w-screen overflow-hidden py-2.5">
      <div className="marquee-track flex">
        <span className="marquee-content">{REPEATED}</span>
        <span className="marquee-content" aria-hidden="true">
          {REPEATED}
        </span>
      </div>
    </div>
  )
}
