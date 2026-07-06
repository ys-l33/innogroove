import { useState } from 'react'
import { AD_LYRICS } from '../data/adLyrics'

const KEYWORD_PATTERN = /(\bads\b|\badvertising\b|\badvertisement\b|광고)/gi

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
      <p className="text-xs text-muted-soft">🎧 앗, 광고를 노래하고 있어요! (Click)</p>
      <p key={index} className="ad-lyrics-fade-in mt-3 text-lg font-semibold leading-snug text-white">
        “{highlightKeywords(lyric.text)}”
      </p>
      <p className="mt-4 text-right text-xs text-muted-soft">
        {lyric.song} · {lyric.artist}
      </p>
    </button>
  )
}
