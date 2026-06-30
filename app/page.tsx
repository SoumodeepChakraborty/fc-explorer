'use client'

import { useState, useMemo, useEffect } from 'react'
import { Player, getPositionGroup } from '@/types/player'
import PlayerCard from '@/components/PlayerCard'
import FilterSidebar, { Filters } from '@/components/FilterSidebar'
import CompareBar from '@/components/CompareBar'
import CompareModal from '@/components/CompareModal'

const DEFAULT_FILTERS: Filters = {
  search: '',
  positionGroup: 'All',
  positions: [],
  minRating: 75,
  league: '',
  nationality: '',
  foot: '',
  minSkillMoves: 0,
  playstyles: [],
  minAge: 15,
  maxAge: 50,
}

type SortField = 'overall' | 'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physical' | 'age'
type SortDir = 'desc' | 'asc'

const SORT_OPTIONS: { label: string; value: SortField }[] = [
  { label: 'OVR', value: 'overall' },
  { label: 'PAC', value: 'pace' },
  { label: 'SHO', value: 'shooting' },
  { label: 'PAS', value: 'passing' },
  { label: 'DRI', value: 'dribbling' },
  { label: 'DEF', value: 'defending' },
  { label: 'PHY', value: 'physical' },
  { label: 'AGE', value: 'age' },
]

const norm = (s: string) => s.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase()

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sortField, setSortField] = useState<SortField>('overall')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [compareList, setCompareList] = useState<Player[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch('/players.json')
      .then(r => r.json())
      .then((data: Player[]) => { setPlayers(data); setLoading(false) })
  }, [])

  const leagues = useMemo(() => [...new Set(players.map(p => p.league))].sort(), [players])
  const nationalities = useMemo(() => [...new Set(players.map(p => p.nationality))].sort(), [players])

  const filtered = useMemo(() => {
    let result = players.filter(p => {
      if (filters.search && !norm(p.name).includes(norm(filters.search))) return false
      if (filters.positionGroup !== 'All' && getPositionGroup(p.position) !== filters.positionGroup) return false
      if (filters.positions.length > 0 && !filters.positions.includes(p.position)) return false
      if (p.overall < filters.minRating) return false
      if (filters.league && p.league !== filters.league) return false
      if (filters.nationality && p.nationality !== filters.nationality) return false
      if (filters.foot && p.preferredFoot !== filters.foot) return false
      if (p.skillMoves < filters.minSkillMoves) return false
      if (p.age < filters.minAge || p.age > filters.maxAge) return false
      if (filters.playstyles.length > 0 && !filters.playstyles.every(ps => p.playstyles.includes(ps))) return false
      return true
    })

    result = [...result].sort((a, b) => {
      const av = a[sortField] as number
      const bv = b[sortField] as number
      return sortDir === 'desc' ? bv - av : av - bv
    })

    return result
  }, [players, filters, sortField, sortDir])

  const toggleCompare = (player: Player) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === player.id)) return prev.filter(p => p.id !== player.id)
      if (prev.length >= 2) return prev
      return [...prev, player]
    })
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortField(field); setSortDir('desc') }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#080c14]">
      {/* Top bar */}
      <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-white/6 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚽</span>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white">FC Explorer</h1>
            <p className="text-[10px] text-white/35">EA FC 26 · Player Stats</p>
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-white/25">Sort</span>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleSort(opt.value)}
              className={`flex items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-colors ${
                sortField === opt.value
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'text-white/35 hover:text-white/70'
              }`}
            >
              {opt.label}
              {sortField === opt.value && (
                <span className="text-[8px]">{sortDir === 'desc' ? '↓' : '↑'}</span>
              )}
            </button>
          ))}
        </div>

        <span className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-white/30">
          {loading ? '…' : `${players.length.toLocaleString()} players`}
        </span>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          totalCount={players.length}
          filteredCount={filtered.length}
          leagues={leagues}
          nationalities={nationalities}
        />

        {/* Grid */}
        <main className="flex-1 overflow-y-auto px-5 py-5 pb-20">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/50" />
              <p className="text-sm">Loading players…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/20">
              <span className="text-4xl">🔍</span>
              <p className="text-sm">No players match your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map(player => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    compareList={compareList}
                    onToggleCompare={toggleCompare}
                    sortField={sortField}
                  />
                ))}
              </div>
              {filtered.length > 500 && (
                <p className="mt-6 text-center text-xs text-white/20">
                  Showing all {filtered.length.toLocaleString()} results — use filters to narrow down
                </p>
              )}
            </>
          )}
        </main>
      </div>

      <CompareBar
        compareList={compareList}
        onRemove={id => setCompareList(prev => prev.filter(p => p.id !== id))}
        onCompare={() => setModalOpen(true)}
        onClear={() => setCompareList([])}
      />

      {modalOpen && compareList.length === 2 && (
        <CompareModal
          players={compareList as [Player, Player]}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
