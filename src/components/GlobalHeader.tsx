import { FlowText } from './FlowText'

interface Props {
  isHome: boolean
  onNavigateHome: () => void
}

export function GlobalHeader({ isHome, onNavigateHome }: Props) {
  return (
    <button
      type="button"
      onClick={onNavigateHome}
      className={`mx-auto block w-full text-center transition-all duration-300 ease-out ${
        isHome ? 'max-w-2xl px-6 pb-2 pt-14 sm:pt-20' : 'max-w-none px-6 pt-8 -mb-5'
      }`}
    >
      <p
        className={`inline-flex items-center rounded-full border border-lime/30 bg-lime/5 tracking-wide transition-all duration-300 ease-out ${
          isHome ? 'mb-4 gap-1.5 px-[1.4rem] py-[0.35rem] text-[1.05rem]' : 'mb-1.5 gap-1 px-3 py-1 text-[0.7rem]'
        }`}
      >
        <span className="font-bold text-lime">INNOGROOVE</span>
        <span className="font-light text-white/60">: The Playlist for Movers</span>
      </p>
      <h1
        className={`text-center font-extrabold tracking-tight text-white transition-all duration-300 ease-out ${
          isHome ? 'text-4xl leading-normal sm:text-5xl' : 'text-base leading-tight sm:text-lg'
        }`}
      >
        Find your <FlowText>groove</FlowText>,
        <br />
        Make a <FlowText>move</FlowText>.
      </h1>
    </button>
  )
}
