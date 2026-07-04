export interface CuratedSelection {
  displayTitle: string
  matchPrompt: string
}

export interface CuratedFileState {
  id: string
  filename: string
  vibe: string
  matchPrompt: string
  displayTitle: string
}

export type ThemeVariant = 'file-hell' | 'boost' | 'trend' | 'celebrate'

export interface CuratedTheme {
  id: string
  variant: ThemeVariant
  emoji: string
  title: string
  tagline: string
  description: string
  accent: 'lime' | 'pink'
  ctaLabel?: string
  matchPrompt?: string
  displayTitle?: string
  fileStates?: CuratedFileState[]
}

export const CURATED_THEMES: CuratedTheme[] = [
  {
    id: 'file-hell',
    variant: 'file-hell',
    emoji: '📁',
    title: "'수정 지옥' 믹스",
    tagline: '파일명 상태로 보는 오늘의 멘탈',
    description: '지금 열려있는 파일 이름을 골라주세요. 딱 그 상태에 맞는 곡을 틀어드려요.',
    accent: 'lime',
    fileStates: [
      {
        id: 'draft',
        filename: '제안서_초안.pptx',
        vibe: '아직 여유 있음 · 잔잔 로파이',
        matchPrompt: '업무 작업할 때 아직 여유있게 집중할 수 있는 잔잔한 로파이 플레이리스트',
        displayTitle: "'수정 지옥' 믹스 — 제안서_초안.pptx",
      },
      {
        id: 'moodboard-v3',
        filename: '무드보드_수정_v3.pptx',
        vibe: '웃프지만 버틴다 · 펑키 밴드',
        matchPrompt: '반복되는 작업에 지쳤지만 웃프게 버틸 수 있는 펑키한 밴드 신나는 플레이리스트',
        displayTitle: "'수정 지옥' 믹스 — 무드보드_수정_v3.pptx",
      },
      {
        id: 'final-final',
        filename: '보고서_진짜_최종_마지막.pptx',
        vibe: '정신줄 부여잡기 · 초고에너지',
        matchPrompt: '마감 직전 강렬하고 파워풀하게 몰아치는 빠른 일렉트로닉 드라이브 플레이리스트',
        displayTitle: "'수정 지옥' 믹스 — 보고서_진짜_최종_마지막.pptx",
      },
    ],
  },
  {
    id: 'boost',
    variant: 'boost',
    emoji: '⚡',
    title: "경쟁 PT 전야제 '도파민 부스터'",
    tagline: '내일 아침 프레젠테이션, 오늘 밤 사기충전',
    description: '웅장하게, 뜨겁게. 출정식처럼 텐션을 끌어올리는 트랙만 모았어요.',
    accent: 'pink',
    ctaLabel: '출정 플레이리스트 가동',
    matchPrompt: '경쟁 PT를 앞두고 강렬하고 파워풀하게 사기를 끌어올리는 신나는 빠른 밴드 플레이리스트',
    displayTitle: "경쟁 PT 전야제 '도파민 부스터'",
  },
  {
    id: 'trend',
    variant: 'trend',
    emoji: '🔍',
    title: '트렌드 레퍼런스 디깅',
    tagline: '숏폼 · 칸 광고제 감성 영감 수집',
    description: '레퍼런스 파도 타기 좋은 트렌디한 무드로 구성했어요.',
    accent: 'lime',
    ctaLabel: '레퍼런스 디깅 시작',
    matchPrompt: '숏폼 영상처럼 트렌디하고 경쾌하고 발랄한 시티팝 신스 신나는 플레이리스트',
    displayTitle: '트렌드 레퍼런스 디깅 플레이리스트',
  },
  {
    id: 'confirmed',
    variant: 'celebrate',
    emoji: '🎉',
    title: "'컨펌 완료' 멘탈 케어",
    tagline: '드디어 끝났다... 나를 위한 작은 축하',
    description: '컨펌이 떨어진 순간, 스스로를 다독여줄 따뜻한 곡들이에요.',
    accent: 'pink',
    ctaLabel: '컨펌 완료! 🎉',
    matchPrompt: '컨펌 완료 후 안도하며 따뜻하고 잔잔하게 마음을 다독이는 포근한 플레이리스트',
    displayTitle: "'컨펌 완료' 멘탈 케어 플레이리스트",
  },
]
