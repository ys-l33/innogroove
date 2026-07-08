const HANGUL_BASE = 0xac00
const HANGUL_LAST = 0xd7a3
const FINAL_COUNT = 28
const RIEUL_FINAL_INDEX = 8

/** 받침 유무에 따라 '로'/'으로' 조사를 붙여 반환한다 (받침 없음 또는 'ㄹ' 받침 -> '로'). */
export function getPostposition(word: string): string {
  const lastChar = word.at(-1)
  if (!lastChar) return `${word}로`

  const code = lastChar.charCodeAt(0)
  if (code < HANGUL_BASE || code > HANGUL_LAST) {
    return `${word}로`
  }

  const finalIndex = (code - HANGUL_BASE) % FINAL_COUNT
  const hasBatchim = finalIndex !== 0 && finalIndex !== RIEUL_FINAL_INDEX
  return hasBatchim ? `${word}으로` : `${word}로`
}
