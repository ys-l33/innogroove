import type { Track, VersionType } from '../data/tracks'

export type Platform = 'youtube-music' | 'spotify' | 'apple-music' | 'melon'
export type VersionPreference = 'original' | 'remaster' | 'live'

export function resolveVersion(track: Track, preference: VersionPreference): VersionType {
  if (preference === 'original') return 'original'
  return track.versions.includes(preference) ? preference : 'original'
}

function versionSuffix(version: VersionType): string {
  if (version === 'remaster') return ' (Remastered)'
  if (version === 'live') return ' (Live)'
  return ''
}

export function buildSearchQuery(track: Track, preference: VersionPreference): string {
  const version = resolveVersion(track, preference)
  return `${track.artist} ${track.title}${versionSuffix(version)}`
}

const PLATFORM_LABEL: Record<Platform, string> = {
  'youtube-music': '유튜브 뮤직',
  spotify: '스포티파이',
  'apple-music': '애플 뮤직',
  melon: '멜론',
}

export function platformLabel(platform: Platform): string {
  return PLATFORM_LABEL[platform]
}

export function buildPlatformSearchUrl(platform: Platform, query: string): string {
  const encoded = encodeURIComponent(query)
  switch (platform) {
    case 'youtube-music':
      return `https://music.youtube.com/search?q=${encoded}`
    case 'spotify':
      return `https://open.spotify.com/search/${encoded}`
    case 'apple-music':
      return `https://music.apple.com/us/search?term=${encoded}`
    case 'melon':
      return `https://www.melon.com/search/total/index.htm?q=${encoded}`
  }
}

const PLATFORM_HOME_URL: Record<Platform, string> = {
  'youtube-music': 'https://music.youtube.com/',
  spotify: 'https://open.spotify.com/',
  'apple-music': 'https://music.apple.com/',
  melon: 'https://www.melon.com/',
}

export function platformHomeUrl(platform: Platform): string {
  return PLATFORM_HOME_URL[platform]
}

export function buildTrackLinks(tracks: Track[], platform: Platform, preference: VersionPreference) {
  return tracks.map((track) => ({
    track,
    query: buildSearchQuery(track, preference),
    url: buildPlatformSearchUrl(platform, buildSearchQuery(track, preference)),
  }))
}
