interface Props {
  visible: boolean
  hasBottomBar: boolean
  onNavigateHome: () => void
}

export function GoHomeFab({ visible, hasBottomBar, onNavigateHome }: Props) {
  if (!visible) return null

  return (
    <button
      type="button"
      onClick={onNavigateHome}
      className={`go-home-fab glass group fixed right-8 z-50 inline-flex items-center rounded-full border border-white/10 px-4 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95 ${
        hasBottomBar ? 'bottom-24' : 'bottom-8'
      }`}
    >
      <span className="text-xs font-light tracking-wide text-white/70 transition-all duration-300 group-hover:font-semibold group-hover:text-white">
        i wanna go back home
      </span>
      <span
        aria-hidden
        className="ml-0 w-0 overflow-hidden text-sm opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:w-4 group-hover:opacity-100"
      >
        🏃
      </span>
    </button>
  )
}
