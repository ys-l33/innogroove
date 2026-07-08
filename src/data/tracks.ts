export type VersionType = 'original' | 'remaster' | 'live'

export interface Track {
  id: string
  title: string
  artist: string
  year: number
  genre: string[]
  mood: string[]
  lang: string
  tempo: 'slow' | 'mid' | 'fast'
  energy: number // 1-10
  versions: VersionType[]
}

// 목업 트랙 데이터베이스 — 실제 음원 연동 전 프로토타입용 가상 카탈로그
export const TRACKS: Track[] = [
  { id: 't01', title: 'Groove Static', artist: 'The Funk Wire', year: 2019, genre: ['funk', 'band'], mood: ['funky', 'upbeat', 'energetic'], lang: 'en', tempo: 'fast', energy: 9, versions: ['original', 'remaster', 'live'] },
  { id: 't02', title: 'Uptown Wires', artist: 'Brass Council', year: 2016, genre: ['funk', 'soul', 'band'], mood: ['funky', 'fun', 'confident'], lang: 'en', tempo: 'mid', energy: 8, versions: ['original', 'live'] },
  { id: 't03', title: 'Slap Bass Diaries', artist: 'Kondo & The Lows', year: 2021, genre: ['funk', 'band'], mood: ['funky', 'playful', 'energetic'], lang: 'en', tempo: 'fast', energy: 9, versions: ['original', 'remaster'] },
  { id: 't04', title: 'Rue de la Pluie', artist: 'Claire Beaumont', year: 2015, genre: ['chanson', 'pop'], mood: ['happy', 'rain', 'warm', 'nostalgic'], lang: 'fr', tempo: 'mid', energy: 5, versions: ['original', 'remaster'] },
  { id: 't05', title: 'Sous le Parapluie', artist: 'Les Jardins', year: 2018, genre: ['french-pop', 'indie'], mood: ['happy', 'rain', 'light', 'sweet'], lang: 'fr', tempo: 'mid', energy: 6, versions: ['original', 'live'] },
  { id: 't06', title: 'Un Café, S\'il Vous Plaît', artist: 'Manon Duval', year: 2020, genre: ['chanson', 'jazz'], mood: ['happy', 'rain', 'cozy', 'warm'], lang: 'fr', tempo: 'slow', energy: 4, versions: ['original', 'remaster', 'live'] },
  { id: 't07', title: 'Danser Sous L\'Orage', artist: 'Théo & Les Voisins', year: 2022, genre: ['french-pop', 'band'], mood: ['happy', 'rain', 'energetic', 'fun'], lang: 'fr', tempo: 'fast', energy: 8, versions: ['original', 'remaster'] },
  { id: 't08', title: 'Midnight Filaments', artist: 'Nocturne Loft', year: 2020, genre: ['lofi', 'chill'], mood: ['focus', 'calm', 'study', 'mellow'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't09', title: 'Quiet Circuit', artist: 'Halden', year: 2019, genre: ['lofi', 'ambient'], mood: ['focus', 'calm', 'study', 'work'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original', 'remaster'] },
  { id: 't10', title: 'Paper Desk', artist: 'Mellow Atlas', year: 2021, genre: ['lofi'], mood: ['focus', 'work', 'concentration', 'calm'], lang: 'inst', tempo: 'slow', energy: 3, versions: ['original'] },
  { id: 't11', title: 'Keystroke Rain', artist: 'Soft Index', year: 2022, genre: ['lofi', 'jazz'], mood: ['focus', 'rain', 'work', 'calm'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't12', title: 'Glass Office', artist: 'Dana Weir', year: 2020, genre: ['ambient', 'piano'], mood: ['focus', 'calm', 'minimal', 'concentration'], lang: 'inst', tempo: 'slow', energy: 1, versions: ['original', 'remaster'] },
  { id: 't13', title: 'Deadline Bloom', artist: 'Cell Theory', year: 2023, genre: ['electronic', 'idm'], mood: ['focus', 'driven', 'productive', 'energetic'], lang: 'inst', tempo: 'mid', energy: 6, versions: ['original'] },
  { id: 't14', title: 'Terminal Velocity', artist: 'Vector North', year: 2018, genre: ['electronic', 'synth'], mood: ['focus', 'driven', 'energetic', 'confident'], lang: 'inst', tempo: 'fast', energy: 7, versions: ['original', 'remaster'] },
  { id: 't15', title: 'Standing Desk', artist: 'Loop Bureau', year: 2021, genre: ['electronic', 'lofi'], mood: ['focus', 'productive', 'work', 'calm'], lang: 'inst', tempo: 'mid', energy: 4, versions: ['original'] },
  { id: 't16', title: 'Spreadsheet Sunrise', artist: 'Morning Index', year: 2022, genre: ['ambient', 'chill'], mood: ['focus', 'work', 'hopeful', 'calm'], lang: 'inst', tempo: 'slow', energy: 3, versions: ['original', 'live'] },
  { id: 't17', title: 'City Pop Elevator', artist: 'Nami Sato', year: 1985, genre: ['city-pop', 'funk'], mood: ['funky', 'nostalgic', 'happy', 'energetic'], lang: 'ja', tempo: 'fast', energy: 8, versions: ['original', 'remaster'] },
  { id: 't18', title: 'Neon Balcony', artist: 'Reiko Mint', year: 1987, genre: ['city-pop'], mood: ['nostalgic', 'happy', 'night', 'warm'], lang: 'ja', tempo: 'mid', energy: 6, versions: ['original', 'remaster', 'live'] },
  { id: 't19', title: 'Rain on Neon', artist: 'Wave Static', year: 2016, genre: ['synth', 'city-pop'], mood: ['rain', 'nostalgic', 'happy', 'night'], lang: 'inst', tempo: 'mid', energy: 5, versions: ['original'] },
  { id: 't20', title: 'Basement Tapes Revival', artist: 'The Amber Line', year: 2017, genre: ['indie', 'band', 'rock'], mood: ['funky', 'raw', 'energetic', 'confident'], lang: 'en', tempo: 'fast', energy: 8, versions: ['original', 'remaster', 'live'] },
  { id: 't21', title: 'Corduroy Static', artist: 'Field Notes', year: 2015, genre: ['indie', 'band'], mood: ['warm', 'happy', 'cozy', 'light'], lang: 'en', tempo: 'mid', energy: 5, versions: ['original', 'live'] },
  { id: 't22', title: 'Garage Sale Sunlight', artist: 'The Paper Kites Wire', year: 2019, genre: ['indie', 'band', 'folk'], mood: ['happy', 'nostalgic', 'warm', 'light'], lang: 'en', tempo: 'mid', energy: 6, versions: ['original'] },
  { id: 't23', title: 'Umbrella Parade', artist: 'Soleil Marceau', year: 2021, genre: ['french-pop'], mood: ['happy', 'rain', 'fun', 'light'], lang: 'fr', tempo: 'fast', energy: 7, versions: ['original', 'remaster'] },
  { id: 't24', title: 'Averse Douce', artist: 'Camille Rosier', year: 2014, genre: ['chanson', 'pop'], mood: ['happy', 'rain', 'sweet', 'warm'], lang: 'fr', tempo: 'slow', energy: 4, versions: ['original', 'live'] },
  { id: 't25', title: 'Blue Note Static', artist: 'Harlan Cross', year: 2018, genre: ['jazz'], mood: ['calm', 'focus', 'smooth', 'night'], lang: 'inst', tempo: 'slow', energy: 3, versions: ['original', 'remaster', 'live'] },
  { id: 't26', title: 'Brass & Rain', artist: 'Delta Horn Society', year: 2020, genre: ['jazz', 'funk'], mood: ['rain', 'funky', 'smooth', 'warm'], lang: 'inst', tempo: 'mid', energy: 5, versions: ['original', 'live'] },
  { id: 't27', title: 'Focus Engine', artist: 'Root & Branch', year: 2023, genre: ['electronic', 'ambient'], mood: ['focus', 'productive', 'driven', 'calm'], lang: 'inst', tempo: 'mid', energy: 5, versions: ['original'] },
  { id: 't28', title: 'Whiteboard Hymn', artist: 'Cell Theory', year: 2021, genre: ['ambient', 'piano'], mood: ['focus', 'calm', 'concentration', 'minimal'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original', 'remaster'] },
  { id: 't29', title: 'Chorus of Deadlines', artist: 'Loop Bureau', year: 2022, genre: ['electronic', 'idm'], mood: ['focus', 'driven', 'productive', 'energetic'], lang: 'inst', tempo: 'fast', energy: 6, versions: ['original'] },
  { id: 't30', title: 'Funky Overtime', artist: 'The Funk Wire', year: 2022, genre: ['funk', 'band'], mood: ['funky', 'productive', 'energetic', 'fun'], lang: 'en', tempo: 'fast', energy: 9, versions: ['original', 'remaster', 'live'] },
  { id: 't31', title: 'Le Bal Mouillé', artist: 'Théo & Les Voisins', year: 2019, genre: ['french-pop', 'band'], mood: ['happy', 'rain', 'energetic', 'fun'], lang: 'fr', tempo: 'fast', energy: 8, versions: ['original', 'live'] },
  { id: 't32', title: 'Petits Matins Gris', artist: 'Claire Beaumont', year: 2017, genre: ['chanson'], mood: ['happy', 'rain', 'gentle', 'nostalgic'], lang: 'fr', tempo: 'slow', energy: 3, versions: ['original', 'remaster'] },
  { id: 't33', title: 'Analog Sunrise', artist: 'Halden', year: 2020, genre: ['lofi', 'jazz'], mood: ['calm', 'focus', 'warm', 'study'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't34', title: 'Bossa for a Deadline', artist: 'Marée Bassa', year: 2021, genre: ['bossa-nova', 'jazz'], mood: ['calm', 'focus', 'warm', 'smooth'], lang: 'inst', tempo: 'mid', energy: 3, versions: ['original', 'live'] },
  { id: 't35', title: 'Sao Paulo Static', artist: 'Marée Bassa', year: 2018, genre: ['bossa-nova'], mood: ['happy', 'warm', 'light', 'sunny'], lang: 'pt', tempo: 'mid', energy: 5, versions: ['original'] },
  { id: 't36', title: 'Riot in the Garage', artist: 'The Amber Line', year: 2016, genre: ['rock', 'band', 'punk'], mood: ['funky', 'raw', 'rebellious', 'energetic'], lang: 'en', tempo: 'fast', energy: 10, versions: ['original', 'remaster', 'live'] },
  { id: 't37', title: 'Static Bloom Live', artist: 'Basement Tapes Revival', year: 2020, genre: ['indie', 'band', 'rock'], mood: ['funky', 'raw', 'energetic'], lang: 'en', tempo: 'fast', energy: 8, versions: ['original', 'live'] },
  { id: 't38', title: 'Soft Machines', artist: 'Root & Branch', year: 2019, genre: ['electronic', 'downtempo'], mood: ['calm', 'focus', 'dreamy', 'work'], lang: 'inst', tempo: 'slow', energy: 3, versions: ['original', 'remaster'] },
  { id: 't39', title: 'Pluie Dorée', artist: 'Manon Duval', year: 2022, genre: ['chanson', 'french-pop'], mood: ['happy', 'rain', 'warm', 'hopeful'], lang: 'fr', tempo: 'mid', energy: 6, versions: ['original', 'remaster', 'live'] },
  { id: 't40', title: 'Soleil Après l\'Averse', artist: 'Soleil Marceau', year: 2020, genre: ['french-pop', 'pop'], mood: ['happy', 'rain', 'hopeful', 'bright'], lang: 'fr', tempo: 'fast', energy: 7, versions: ['original'] },
  { id: 't41', title: 'Deep Work Protocol', artist: 'Vector North', year: 2022, genre: ['electronic', 'ambient'], mood: ['focus', 'driven', 'productive', 'minimal'], lang: 'inst', tempo: 'mid', energy: 4, versions: ['original', 'remaster'] },
  { id: 't42', title: 'Notebook Static', artist: 'Mellow Atlas', year: 2018, genre: ['lofi'], mood: ['focus', 'calm', 'study', 'nostalgic'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't43', title: 'Horn Section Heist', artist: 'Brass Council', year: 2021, genre: ['funk', 'soul'], mood: ['funky', 'confident', 'fun', 'energetic'], lang: 'en', tempo: 'fast', energy: 9, versions: ['original', 'remaster'] },
  { id: 't44', title: 'Rehearsal Room 3', artist: 'Kondo & The Lows', year: 2017, genre: ['funk', 'band', 'jazz'], mood: ['funky', 'playful', 'warm'], lang: 'inst', tempo: 'mid', energy: 7, versions: ['original', 'live'] },
  { id: 't45', title: 'Slow Fold', artist: 'Dana Weir', year: 2023, genre: ['piano', 'ambient'], mood: ['calm', 'focus', 'sad-but-hopeful', 'minimal'], lang: 'inst', tempo: 'slow', energy: 1, versions: ['original'] },
  { id: 't46', title: 'Silver Static Choir', artist: 'Nocturne Loft', year: 2021, genre: ['ambient', 'lofi'], mood: ['calm', 'focus', 'dreamy', 'night'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original', 'remaster'] },
  { id: 't47', title: 'La Fête des Parapluies', artist: 'Les Jardins', year: 2023, genre: ['french-pop', 'indie', 'band'], mood: ['happy', 'rain', 'fun', 'energetic'], lang: 'fr', tempo: 'fast', energy: 8, versions: ['original', 'live'] },
  { id: 't48', title: 'Funk You Up', artist: 'Slap Bass Diaries', year: 2020, genre: ['funk'], mood: ['funky', 'confident', 'energetic', 'fun'], lang: 'en', tempo: 'fast', energy: 9, versions: ['original', 'remaster', 'live'] },
  { id: 't49', title: 'Office Plant Reverie', artist: 'Morning Index', year: 2023, genre: ['ambient', 'chill'], mood: ['focus', 'calm', 'work', 'hopeful'], lang: 'inst', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't50', title: 'Tokyo Skyline Drive', artist: 'Nami Sato', year: 1986, genre: ['city-pop'], mood: ['nostalgic', 'happy', 'night', 'energetic'], lang: 'ja', tempo: 'fast', energy: 7, versions: ['original', 'remaster'] },
  { id: 't51', title: '밤안개 (Night Fog)', artist: '블루먼데이 (Blue Monday)', year: 2022, genre: ['indie', 'rnb'], mood: ['night', 'calm', 'dreamy', 'nostalgic'], lang: 'ko', tempo: 'slow', energy: 3, versions: ['original'] },
  { id: 't52', title: '유영 (Drifting)', artist: '모노트랙 (Monotrack)', year: 2021, genre: ['rnb', 'ambient'], mood: ['calm', 'dreamy', 'focus', 'mellow'], lang: 'ko', tempo: 'slow', energy: 2, versions: ['original'] },
  { id: 't53', title: '시차 (Time Difference)', artist: '로우파이 시티 (Lofi City)', year: 2023, genre: ['lofi', 'indie'], mood: ['nostalgic', 'calm', 'night', 'study'], lang: 'ko', tempo: 'slow', energy: 3, versions: ['original', 'remaster'] },
  { id: 't54', title: '너의 바다 (Your Ocean)', artist: '웨이브 (WAVE)', year: 2022, genre: ['indie', 'pop'], mood: ['warm', 'happy', 'light', 'sweet'], lang: 'ko', tempo: 'mid', energy: 5, versions: ['original', 'live'] },
  { id: 't55', title: '공백 (Silence)', artist: '새벽 3시', year: 2023, genre: ['rnb', 'ambient'], mood: ['sad-but-hopeful', 'calm', 'night', 'minimal'], lang: 'ko', tempo: 'slow', energy: 1, versions: ['original'] },
  { id: 't56', title: '우리가 잃어버린 것들', artist: '계절의 틈', year: 2021, genre: ['indie', 'folk'], mood: ['nostalgic', 'warm', 'sad-but-hopeful', 'gentle'], lang: 'ko', tempo: 'slow', energy: 2, versions: ['original', 'remaster'] },
  { id: 't57', title: '비행 (Flight)', artist: '서울신스 (Seoul Synth)', year: 2022, genre: ['synth', 'city-pop'], mood: ['night', 'energetic', 'dreamy', 'confident'], lang: 'ko', tempo: 'mid', energy: 6, versions: ['original', 'remaster'] },
]
