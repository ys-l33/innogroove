import { TRACKS, type Track } from '../data/tracks'

export interface PreferenceProfile {
  genre: Record<string, number>
  mood: Record<string, number>
  lang: string | null
  tempo: Track['tempo'] | null
  energyBias: 'low' | 'high' | null
}

function emptyProfile(): PreferenceProfile {
  return { genre: {}, mood: {}, lang: null, tempo: null, energyBias: null }
}

function bump(record: Record<string, number>, key: string, amount: number) {
  record[key] = (record[key] ?? 0) + amount
}

type Rule = {
  patterns: string[]
  apply: (p: PreferenceProfile) => void
}

// 한국어 프롬프트 키워드 → 태그 프로필 매핑 (부분 문자열 매칭 방식)
const RULES: Rule[] = [
  { patterns: ['펑키', '펑크한', '훵키', '훵크'], apply: (p) => { bump(p.mood, 'funky', 3); bump(p.genre, 'funk', 3) } },
  { patterns: ['밴드'], apply: (p) => bump(p.genre, 'band', 3) },
  { patterns: ['록', '락'], apply: (p) => bump(p.genre, 'rock', 3) },
  { patterns: ['펑크록', '펑크 록', '펑크락'], apply: (p) => bump(p.genre, 'punk', 3) },
  { patterns: ['인디'], apply: (p) => bump(p.genre, 'indie', 3) },
  { patterns: ['재즈'], apply: (p) => bump(p.genre, 'jazz', 3) },
  { patterns: ['보사노바', '보사 노바'], apply: (p) => bump(p.genre, 'bossa-nova', 3) },
  { patterns: ['시티팝', '시티 팝'], apply: (p) => bump(p.genre, 'city-pop', 3) },
  { patterns: ['신스', '신디사이저'], apply: (p) => bump(p.genre, 'synth', 2) },
  { patterns: ['로파이', 'lofi', 'lo-fi'], apply: (p) => bump(p.genre, 'lofi', 3) },
  { patterns: ['앰비언트', '엠비언트'], apply: (p) => bump(p.genre, 'ambient', 3) },
  { patterns: ['일렉트로닉', '일렉트로니카', '전자음악'], apply: (p) => bump(p.genre, 'electronic', 3) },
  { patterns: ['피아노'], apply: (p) => bump(p.genre, 'piano', 3) },
  { patterns: ['소울'], apply: (p) => bump(p.genre, 'soul', 2) },
  { patterns: ['샹송'], apply: (p) => bump(p.genre, 'chanson', 3) },
  { patterns: ['포크', '어쿠스틱'], apply: (p) => bump(p.genre, 'folk', 2) },
  { patterns: ['알앤비', 'r&b', 'rnb', 'r n b'], apply: (p) => bump(p.genre, 'rnb', 3) },

  { patterns: ['프랑스', '프렌치', '불어', '샹송'], apply: (p) => { p.lang = 'fr' } },
  { patterns: ['일본', '제이팝', 'j-pop', 'jpop'], apply: (p) => { p.lang = 'ja' } },
  { patterns: ['한국', '한국어', '가요', 'k-pop', '케이팝'], apply: (p) => { p.lang = 'ko' } },
  { patterns: ['영어', '팝송', '팝'], apply: (p) => { if (!p.lang) p.lang = 'en' } },
  { patterns: ['포르투갈', '브라질'], apply: (p) => { p.lang = 'pt' } },
  { patterns: ['가사 없는', '보컬 없는', '연주곡', '인스트루멘탈'], apply: (p) => { p.lang = 'inst' } },

  { patterns: ['비 오는', '비오는', '빗소리', '장마', '우천'], apply: (p) => bump(p.mood, 'rain', 4) },
  { patterns: ['기쁜', '기쁨', '즐거운', '행복'], apply: (p) => bump(p.mood, 'happy', 3) },
  { patterns: ['신나는', '신남', '업된', '흥나는'], apply: (p) => { bump(p.mood, 'energetic', 3); bump(p.mood, 'upbeat', 2) } },
  { patterns: ['잔잔', '차분', '평온', '고요'], apply: (p) => bump(p.mood, 'calm', 3) },
  { patterns: ['집중'], apply: (p) => { bump(p.mood, 'focus', 4); bump(p.genre, 'lofi', 1); bump(p.genre, 'ambient', 1) } },
  { patterns: ['공부'], apply: (p) => { bump(p.mood, 'study', 3); bump(p.mood, 'focus', 2) } },
  { patterns: ['업무', '일할 때', '일 할 때', '작업'], apply: (p) => { bump(p.mood, 'work', 3); bump(p.mood, 'focus', 2) } },
  { patterns: ['몰입'], apply: (p) => bump(p.mood, 'concentration', 3) },
  { patterns: ['생산성', '능률'], apply: (p) => { bump(p.mood, 'productive', 3); bump(p.mood, 'driven', 2) } },
  { patterns: ['따뜻', '포근'], apply: (p) => bump(p.mood, 'warm', 3) },
  { patterns: ['향수', '추억', '그리운', '노스탤직'], apply: (p) => bump(p.mood, 'nostalgic', 3) },
  { patterns: ['밤', '심야', '새벽'], apply: (p) => bump(p.mood, 'night', 2) },
  { patterns: ['드라이브'], apply: (p) => { bump(p.mood, 'night', 1); bump(p.mood, 'energetic', 2) } },
  { patterns: ['카페'], apply: (p) => { bump(p.mood, 'calm', 2); bump(p.mood, 'warm', 2) } },
  { patterns: ['경쾌', '발랄'], apply: (p) => { bump(p.mood, 'light', 2); bump(p.mood, 'fun', 2) } },
  { patterns: ['설레', '두근'], apply: (p) => bump(p.mood, 'hopeful', 2) },

  { patterns: ['느린', '슬로우', '차분한 템포'], apply: (p) => { p.tempo = 'slow' } },
  { patterns: ['빠른', '업템포', '신나는 템포'], apply: (p) => { p.tempo = 'fast' } },

  { patterns: ['강렬', '파워풀'], apply: (p) => { p.energyBias = 'high' } },
  { patterns: ['조용', '은은'], apply: (p) => { p.energyBias = 'low' } },
]

export function buildProfileFromPrompt(prompt: string): PreferenceProfile {
  const profile = emptyProfile()
  const text = prompt.trim()
  if (!text) return profile

  // "슬프기보단/슬프지 않고" 같은 부정 표현이 있으면 슬픔 관련 태그는 걸지 않고 happy만 강조
  const negatesSad = /슬프[^가-힣]{0,4}(보다|보단|않|말고)/.test(text)
  if (negatesSad) bump(profile.mood, 'happy', 3)

  for (const rule of RULES) {
    if (rule.patterns.some((p) => text.includes(p))) {
      rule.apply(profile)
    }
  }

  return profile
}

function scoreTrack(track: Track, profile: PreferenceProfile): number {
  let score = 0
  for (const g of track.genre) {
    if (profile.genre[g]) score += profile.genre[g] * 2
  }
  for (const m of track.mood) {
    if (profile.mood[m]) score += profile.mood[m] * 2
  }
  if (profile.lang) {
    if (profile.lang === 'inst' && track.lang === 'inst') score += 5
    else if (track.lang === profile.lang) score += 5
  }
  if (profile.tempo && track.tempo === profile.tempo) score += 3
  if (profile.energyBias === 'high') score += track.energy * 0.6
  if (profile.energyBias === 'low') score += (10 - track.energy) * 0.6

  return score
}

const PLAYLIST_SIZE = 12
const MAX_PER_ARTIST = 2

function pickDiverse(scored: { track: Track; score: number }[], size: number): Track[] {
  const sorted = [...scored].sort((a, b) => b.score - a.score)
  const picked: Track[] = []
  const artistCount: Record<string, number> = {}

  for (const { track } of sorted) {
    if (picked.length >= size) break
    const count = artistCount[track.artist] ?? 0
    if (count >= MAX_PER_ARTIST) continue
    picked.push(track)
    artistCount[track.artist] = count + 1
  }

  // 다양성 필터로 자리가 안 찼다면 나머지는 점수 순으로 채움
  if (picked.length < size) {
    for (const { track } of sorted) {
      if (picked.length >= size) break
      if (picked.some((t) => t.id === track.id)) continue
      picked.push(track)
    }
  }

  return picked
}

export function generatePlaylist(prompt: string): { profile: PreferenceProfile; tracks: Track[] } {
  const profile = buildProfileFromPrompt(prompt)
  const hasAnySignal = Object.keys(profile.genre).length || Object.keys(profile.mood).length || profile.lang || profile.tempo
  const scored = TRACKS.map((track) => ({ track, score: hasAnySignal ? scoreTrack(track, profile) : track.energy }))
  const tracks = pickDiverse(scored, PLAYLIST_SIZE)
  return { profile, tracks }
}

export function regeneratePlaylist(
  profile: PreferenceProfile,
  currentTracks: Track[],
  likedIds: string[],
  removedIds: string[],
): { profile: PreferenceProfile; tracks: Track[] } {
  const nextProfile: PreferenceProfile = {
    genre: { ...profile.genre },
    mood: { ...profile.mood },
    lang: profile.lang,
    tempo: profile.tempo,
    energyBias: profile.energyBias,
  }

  const likedTracks = currentTracks.filter((t) => likedIds.includes(t.id))
  const removedTracks = currentTracks.filter((t) => removedIds.includes(t.id))

  for (const t of likedTracks) {
    for (const g of t.genre) bump(nextProfile.genre, g, 2)
    for (const m of t.mood) bump(nextProfile.mood, m, 2)
  }
  for (const t of removedTracks) {
    for (const g of t.genre) bump(nextProfile.genre, g, -1.5)
    for (const m of t.mood) bump(nextProfile.mood, m, -1.5)
  }

  const excludeIds = new Set(removedIds)
  const keptTracks = currentTracks.filter((t) => !excludeIds.has(t.id))

  const candidatePool = TRACKS.filter((t) => !excludeIds.has(t.id) && !keptTracks.some((k) => k.id === t.id))
  const scored = candidatePool.map((track) => ({ track, score: scoreTrack(track, nextProfile) }))
  const fillCount = Math.max(PLAYLIST_SIZE - keptTracks.length, 0)
  const filled = pickDiverse(scored, fillCount)

  // 좋아요한 곡은 그대로 유지하고, 나머지는 새로 스코어링된 곡으로 재구성
  const tracks = [...keptTracks, ...filled]
  return { profile: nextProfile, tracks }
}
