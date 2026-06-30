'use client'

import { useState } from 'react'
import { Player, getPositionColor, getRatingColor, getStatLabels, getPlayerStats } from '@/types/player'

interface Props {
  player: Player
  compareList: Player[]
  onToggleCompare: (player: Player) => void
  sortField?: string
}

export default function PlayerCard({ player, compareList, onToggleCompare, sortField }: Props) {
  const [imgError, setImgError] = useState(false)
  const isInCompare = compareList.some(p => p.id === player.id)
  const compareDisabled = compareList.length >= 2 && !isInCompare
  const statLabels = getStatLabels(player.position)
  const stats = getPlayerStats(player)
  const posColor = getPositionColor(player.position)
  const ratingColor = getRatingColor(player.overall)

  const initials = player.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div data-player-card className="relative group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/16 hover:bg-white/6 hover:shadow-lg hover:shadow-black/30">

      {/* Header: rating + position + flag */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tabular-nums leading-none" style={{ color: ratingColor }}>
            {player.overall}
          </span>
          <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: posColor }}>
            {player.position}
          </span>
        </div>
        <span className="text-xl leading-none">{player.flag}</span>
      </div>

      {/* Player image + name */}
      <div className="flex items-center gap-2.5">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-white/6">
          {player.image && !imgError ? (
            <img
              src={player.image}
              alt={player.name}
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white/40">
              {initials}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-white leading-tight">{player.name}</p>
          <p className="mt-0.5 truncate text-xs text-white/50">{player.club}</p>
          <p className="text-[10px] text-white/30">{player.league}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-1">
        {statLabels.map((label, i) => {
          const isSorted = sortField === label.toLowerCase() ||
            (sortField === 'physical' && label === 'PHY') ||
            (sortField === 'pace' && label === 'PAC') ||
            (sortField === 'shooting' && label === 'SHO') ||
            (sortField === 'passing' && label === 'PAS') ||
            (sortField === 'dribbling' && label === 'DRI') ||
            (sortField === 'defending' && label === 'DEF')
          return (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSorted ? 'text-violet-400' : 'text-white/40'}`}>
                {label}
              </span>
              <span className="text-sm font-bold tabular-nums" style={{ color: getStatColor(stats[i]) }}>
                {stats[i]}
              </span>
              <div className="h-0.5 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${stats[i]}%`, backgroundColor: getStatColor(stats[i]) }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1.5 border-t border-white/6 pt-2">
        <div className="flex items-center justify-between text-[10px] text-white/40">
          <span><span className="text-white/60 mr-1">SM</span>{'★'.repeat(player.skillMoves)}{'☆'.repeat(5 - player.skillMoves)}</span>
          <span><span className="text-white/60 mr-1">WF</span>{'★'.repeat(player.weakFoot)}{'☆'.repeat(5 - player.weakFoot)}</span>
          <span className="capitalize">{player.preferredFoot}</span>
        </div>
        {player.playstyles.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {player.playstyles.slice(0, 3).map(ps => (
              <span key={ps} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-white/50">
                {ps}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Compare button */}
      <button
        onClick={() => onToggleCompare(player)}
        disabled={compareDisabled}
        className={`mt-auto rounded-xl py-2 text-xs font-semibold transition-all ${
          isInCompare
            ? 'bg-violet-500/20 border border-violet-400/40 text-violet-300 hover:bg-violet-500/30'
            : compareDisabled
            ? 'cursor-not-allowed border border-white/6 bg-white/4 text-white/20'
            : 'border border-white/10 bg-white/6 text-white/60 hover:bg-white/10 hover:text-white/90'
        }`}
      >
        {isInCompare ? '✓ Selected' : '+ Compare'}
      </button>
    </div>
  )
}

function getStatColor(value: number): string {
  if (value >= 85) return '#4ade80'
  if (value >= 70) return '#facc15'
  if (value >= 55) return '#fb923c'
  return '#f87171'
}
