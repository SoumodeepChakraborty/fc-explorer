'use client'

import { PositionGroup } from '@/types/player'

export interface Filters {
  search: string
  positionGroup: PositionGroup
  positions: string[]
  minRating: number
  league: string
  nationality: string
  foot: string
  minSkillMoves: number
  playstyles: string[]
  minAge: number
  maxAge: number
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  totalCount: number
  filteredCount: number
  leagues: string[]
  nationalities: string[]
}

const POSITION_GROUPS: { label: string; value: PositionGroup }[] = [
  { label: 'All', value: 'All' },
  { label: 'GK', value: 'GK' },
  { label: 'DEF', value: 'DEF' },
  { label: 'MID', value: 'MID' },
  { label: 'ATT', value: 'ATT' },
]

const POSITIONS: Record<PositionGroup, string[]> = {
  All: [],
  GK: ['GK'],
  DEF: ['CB', 'LB', 'RB', 'LWB', 'RWB'],
  MID: ['CDM', 'CM', 'CAM', 'LM', 'RM'],
  ATT: ['LW', 'RW', 'CF', 'ST'],
}

const ALL_PLAYSTYLES = [
  'Finesse Shot', 'Power Shot', 'Power Header', 'Low Driven Shot', 'Acrobatic',
  'Dead Ball', 'Long Ball Pass', 'Through Pass', 'Tiki Taka',
  'Rapid', 'Trickster', 'Technical', 'Press Proven', 'Relentless',
  'Intercept', 'Jockey', 'Slide Tackle', 'Block', 'Bruiser', 'Aerial Fortress',
  'Gamechanger', 'Inventive', 'Far Throw', 'Footwork', 'Rush Out', 'Far Reach',
]

export default function FilterSidebar({ filters, onChange, totalCount, filteredCount, leagues, nationalities }: Props) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })
  const availablePositions = POSITIONS[filters.positionGroup]

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col gap-5 overflow-y-auto border-r border-white/6 bg-white/2 px-4 py-5">

      <p className="text-xs text-white/30">
        <span className="font-semibold text-white/70">{filteredCount.toLocaleString()}</span> of {totalCount.toLocaleString()} players
      </p>

      {/* Search */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Search</label>
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Player name..."
            value={filters.search}
            onChange={e => update({ search: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/6 py-2 pl-8 pr-3 text-xs text-white placeholder-white/30 outline-none focus:border-white/20 focus:bg-white/8"
          />
        </div>
      </div>

      {/* Position */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Position</label>
        <div className="flex flex-wrap gap-1.5">
          {POSITION_GROUPS.map(g => (
            <button
              key={g.value}
              onClick={() => update({ positionGroup: g.value, positions: [] })}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                filters.positionGroup === g.value ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {availablePositions.length > 1 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {availablePositions.map(pos => {
              const active = filters.positions.includes(pos)
              return (
                <button
                  key={pos}
                  onClick={() => update({ positions: active ? filters.positions.filter(p => p !== pos) : [...filters.positions, pos] })}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold transition-colors ${
                    active ? 'bg-white/20 text-white' : 'border border-white/8 text-white/35 hover:text-white/60'
                  }`}
                >
                  {pos}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Min rating */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">
          Min rating <span className="font-semibold text-white/70">{filters.minRating}+</span>
        </label>
        <input type="range" min={65} max={95} value={filters.minRating}
          onChange={e => update({ minRating: Number(e.target.value) })}
          className="w-full accent-violet-400" />
        <div className="flex justify-between text-[10px] text-white/25"><span>65</span><span>95</span></div>
      </div>

      {/* Age range */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Age</label>
        <div className="flex items-center gap-2">
          <input
            type="number" min={15} max={50} value={filters.minAge}
            onChange={e => update({ minAge: Number(e.target.value) })}
            className="w-full rounded-lg border border-white/10 bg-white/6 py-1.5 px-2 text-xs text-white/70 outline-none focus:border-white/20 text-center"
          />
          <span className="text-xs text-white/30">–</span>
          <input
            type="number" min={15} max={50} value={filters.maxAge}
            onChange={e => update({ maxAge: Number(e.target.value) })}
            className="w-full rounded-lg border border-white/10 bg-white/6 py-1.5 px-2 text-xs text-white/70 outline-none focus:border-white/20 text-center"
          />
        </div>
      </div>

      {/* League */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">League</label>
        <select value={filters.league} onChange={e => update({ league: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-[#0d1020] py-2 px-3 text-xs text-white/70 outline-none focus:border-white/20">
          <option value="">All leagues</option>
          {leagues.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Nationality */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Nationality</label>
        <select value={filters.nationality} onChange={e => update({ nationality: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-[#0d1020] py-2 px-3 text-xs text-white/70 outline-none focus:border-white/20">
          <option value="">All</option>
          {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Foot */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Foot</label>
        <div className="flex gap-1.5">
          {['', 'Right', 'Left'].map(f => (
            <button key={f || 'any'} onClick={() => update({ foot: f })}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                filters.foot === f ? 'bg-white/15 text-white' : 'border border-white/8 text-white/35 hover:text-white/60'
              }`}>
              {f || 'Any'}
            </button>
          ))}
        </div>
      </div>

      {/* Skill moves */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Min skill moves</label>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => update({ minSkillMoves: n })}
              className={`flex-1 rounded py-1 text-xs transition-colors ${
                filters.minSkillMoves === n ? 'bg-white/15 text-yellow-300' : 'border border-white/8 text-white/30 hover:text-white/60'
              }`}>
              {n === 0 ? '—' : `${n}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Playstyles */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">
          Playstyle
          {filters.playstyles.length > 0 && (
            <button onClick={() => update({ playstyles: [] })} className="ml-2 text-white/30 hover:text-white/60">clear</button>
          )}
        </label>
        <div className="flex flex-wrap gap-1">
          {ALL_PLAYSTYLES.map(ps => {
            const active = filters.playstyles.includes(ps)
            return (
              <button
                key={ps}
                onClick={() => update({
                  playstyles: active
                    ? filters.playstyles.filter(p => p !== ps)
                    : [...filters.playstyles, ps]
                })}
                className={`rounded-full px-2 py-0.5 text-[9px] font-medium transition-colors ${
                  active
                    ? 'bg-violet-500/30 border border-violet-400/40 text-violet-300'
                    : 'border border-white/8 text-white/30 hover:text-white/60'
                }`}
              >
                {ps}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({
          search: '', positionGroup: 'All', positions: [],
          minRating: 75, league: '', nationality: '', foot: '',
          minSkillMoves: 0, playstyles: [], minAge: 15, maxAge: 50,
        })}
        className="mt-auto rounded-lg border border-white/8 py-2 text-xs text-white/35 transition-colors hover:text-white/60"
      >
        Reset filters
      </button>
    </aside>
  )
}
