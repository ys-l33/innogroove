import { useState } from 'react'
import type { Track } from './data/tracks'
import { generatePlaylist, regeneratePlaylist, type PreferenceProfile } from './lib/matcher'
import type { Platform, VersionPreference } from './lib/platformLinks'
import type { CuratedSelection } from './data/curatedThemes'
import { SearchPage } from './components/SearchPage'
import { PlaylistScreen } from './components/PlaylistScreen'
import { OptionsScreen } from './components/OptionsScreen'
import { RedirectScreen } from './components/RedirectScreen'

interface PlaylistStage {
  name: 'playlist'
  origin: 'custom' | 'curated'
  title: string
  profile: PreferenceProfile
  tracks: Track[]
  round: number
}

interface OptionsStage {
  name: 'options'
  tracks: Track[]
  previous: PlaylistStage
}

interface RedirectStage {
  name: 'redirect'
  tracks: Track[]
  platform: Platform
  preference: VersionPreference
  previous: OptionsStage
}

type Stage = { name: 'search' } | PlaylistStage | OptionsStage | RedirectStage

function App() {
  const [stage, setStage] = useState<Stage>({ name: 'search' })

  function handleCustomSearch(prompt: string) {
    const { profile, tracks } = generatePlaylist(prompt)
    setStage({ name: 'playlist', origin: 'custom', title: prompt, profile, tracks, round: 1 })
  }

  function handleCuratedSelect(selection: CuratedSelection) {
    const { profile, tracks } = generatePlaylist(selection.matchPrompt)
    setStage({ name: 'playlist', origin: 'curated', title: selection.displayTitle, profile, tracks, round: 1 })
  }

  function handleRegenerate(current: PlaylistStage, likedIds: string[], removedIds: string[]) {
    const { profile, tracks } = regeneratePlaylist(current.profile, current.tracks, likedIds, removedIds)
    setStage({ ...current, profile, tracks, round: current.round + 1 })
  }

  function handleConfirm(current: PlaylistStage, finalTracks: Track[]) {
    setStage({ name: 'options', tracks: finalTracks, previous: current })
  }

  function handleProceed(current: OptionsStage, preference: VersionPreference, platform: Platform) {
    setStage({ name: 'redirect', tracks: current.tracks, platform, preference, previous: current })
  }

  function handleRestart() {
    setStage({ name: 'search' })
  }

  if (stage.name === 'search') {
    return <SearchPage onCustomSubmit={handleCustomSearch} onCuratedSelect={handleCuratedSelect} />
  }

  if (stage.name === 'playlist') {
    return (
      <PlaylistScreen
        title={stage.title}
        origin={stage.origin}
        tracks={stage.tracks}
        round={stage.round}
        onRegenerate={(liked, removed) => handleRegenerate(stage, liked, removed)}
        onConfirm={(finalTracks) => handleConfirm(stage, finalTracks)}
        onRestart={handleRestart}
      />
    )
  }

  if (stage.name === 'options') {
    return (
      <OptionsScreen
        tracks={stage.tracks}
        onProceed={(preference, platform) => handleProceed(stage, preference, platform)}
        onBack={() => setStage(stage.previous)}
      />
    )
  }

  return (
    <RedirectScreen
      tracks={stage.tracks}
      platform={stage.platform}
      preference={stage.preference}
      onBack={() => setStage(stage.previous)}
      onRestart={handleRestart}
    />
  )
}

export default App
