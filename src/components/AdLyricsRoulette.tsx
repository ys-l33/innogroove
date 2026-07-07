import { useState } from 'react'
import { AD_LYRICS } from '../data/adLyrics'

const KEYWORD_PATTERN = /(\bads\b|\badvertising\b|\badvertisement\b|\bad\b|광고)/gi

function highlightKeywords(text: string) {
  return text.split(KEYWORD_PATTERN).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="keyword-gradient">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function pickNextIndex(current: number) {
  if (AD_LYRICS.length <= 1) return 0
  let next = current
  while (next === current) {
    next = Math.floor(Math.random() * AD_LYRICS.length)
  }
  return next
}

function MiniEqualizer() {
  return (
    <span aria-hidden className="mini-eq flex h-3 shrink-0 items-end gap-[2px]">
      <span className="eq-bar eq-bar-1 h-full w-[2px] rounded-full bg-lime" />
      <span className="eq-bar eq-bar-2 h-full w-[2px] rounded-full bg-pink" />
      <span className="eq-bar eq-bar-3 h-full w-[2px] rounded-full bg-lime" />
      <span className="eq-bar eq-bar-4 h-full w-[2px] rounded-full bg-pink" />
    </span>
  )
}

export function AdLyricsRoulette() {
  const [index, setIndex] = useState(0)
  const [bouncing, setBouncing] = useState(false)
  const lyric = AD_LYRICS[index]

  function handleClick() {
    setIndex((prev) => pickNextIndex(prev))
    setBouncing(true)
    setTimeout(() => setBouncing(false), 200)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`glass w-full rounded-3xl border border-white/10 p-6 text-left transition-transform duration-200 ease-out hover:border-lime/30 ${
        bouncing ? 'scale-[0.97]' : 'scale-100'
      }`}
    >
      <p className="text-xs font-medium text-white/70">🎙️ 광고도 노래 가사가 될 수 있다 (눌러보세요!)</p>
      <p key={index} className="ad-lyrics-fade-in mt-3 text-lg font-semibold leading-snug text-white">
        “{highlightKeywords(lyric.text)}”
      </p>
      <p className="mt-4 flex items-center justify-end gap-1.5 text-xs font-medium text-white/70">
        <MiniEqualizer />
        {lyric.song} · {lyric.artist}
      </p>
    </button>
  )
}
