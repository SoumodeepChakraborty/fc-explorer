export interface Player {
  id: number
  name: string
  overall: number
  position: string
  nationality: string
  flag: string
  club: string
  league: string
  age: number
  height: number
  preferredFoot: 'Left' | 'Right'
  weakFoot: number
  skillMoves: number
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
  gkDiving?: number
  gkHandling?: number
  gkKicking?: number
  gkReflexes?: number
  gkSpeed?: number
  gkPositioning?: number
  playstyles: string[]
  image?: string
}

export type PositionGroup = 'All' | 'GK' | 'DEF' | 'MID' | 'ATT'

const POSITION_MAP: Record<string, PositionGroup> = {
  GK: 'GK',
  CB: 'DEF', LB: 'DEF', RB: 'DEF', LWB: 'DEF', RWB: 'DEF',
  CDM: 'MID', CM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
  LW: 'ATT', RW: 'ATT', CF: 'ATT', ST: 'ATT',
}

export function getPositionGroup(position: string): PositionGroup {
  return POSITION_MAP[position] ?? 'All'
}

export function getRatingColor(overall: number): string {
  if (overall >= 90) return '#a855f7'
  if (overall >= 85) return '#eab308'
  if (overall >= 80) return '#9ca3af'
  return '#cd7f32'
}

export function getPositionColor(position: string): string {
  const group = getPositionGroup(position)
  if (group === 'GK') return '#f59e0b'
  if (group === 'DEF') return '#3b82f6'
  if (group === 'MID') return '#10b981'
  if (group === 'ATT') return '#ef4444'
  return '#6b7280'
}

export function getStatLabels(position: string): string[] {
  if (position === 'GK') return ['DIV', 'HAN', 'KIC', 'REF', 'SPD', 'POS']
  return ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY']
}

export function getPlayerStats(player: Player): number[] {
  if (player.position === 'GK') {
    return [
      player.gkDiving ?? 0,
      player.gkHandling ?? 0,
      player.gkKicking ?? 0,
      player.gkReflexes ?? 0,
      player.gkSpeed ?? 0,
      player.gkPositioning ?? 0,
    ]
  }
  return [
    player.pace,
    player.shooting,
    player.passing,
    player.dribbling,
    player.defending,
    player.physical,
  ]
}
