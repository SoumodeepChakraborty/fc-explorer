'use client'

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts'
import {
  Player, getStatLabels, getPlayerStats, getRatingColor, getPositionColor,
} from '@/types/player'

interface Props {
  players: [Player, Player]
  onClose: () => void
}

export default function CompareModal({ players, onClose }: Props) {
  const [p1, p2] = players

  const samePositionGroup = (
    getStatLabels(p1.position)[0] === getStatLabels(p2.position)[0]
  )

  const labels = samePositionGroup
    ? getStatLabels(p1.position)
    : ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY']

  const s1 = samePositionGroup
    ? getPlayerStats(p1)
    : [p1.pace, p1.shooting, p1.passing, p1.dribbling, p1.defending, p1.physical]
  const s2 = samePositionGroup
    ? getPlayerStats(p2)
    : [p2.pace, p2.shooting, p2.passing, p2.dribbling, p2.defending, p2.physical]

  const radarData = labels.map((label, i) => ({
    stat: label,
    [p1.name.split(' ').slice(-1)[0]]: s1[i],
    [p2.name.split(' ').slice(-1)[0]]: s2[i],
  }))

  const p1Key = p1.name.split(' ').slice(-1)[0]
  const p2Key = p2.name.split(' ').slice(-1)[0]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0d1120] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-widest">
            Head to Head
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/8 hover:text-white/80"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-0 md:flex-row">
          {/* Radar chart */}
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="stat"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                  tickCount={5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1120',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                />
                <Radar
                  name={p1Key}
                  dataKey={p1Key}
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name={p2Key}
                  dataKey={p2Key}
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{value}</span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Stat comparison table */}
          <div className="w-full border-t border-white/6 p-5 md:w-64 md:border-l md:border-t-0">
            {/* Player headers */}
            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              <PlayerBadge player={p1} />
              <div />
              <PlayerBadge player={p2} />
            </div>

            {/* Stats rows */}
            <div className="flex flex-col gap-2">
              {labels.map((label, i) => {
                const v1 = s1[i], v2 = s2[i]
                const better1 = v1 > v2, better2 = v2 > v1
                return (
                  <div key={label} className="grid grid-cols-3 items-center gap-1 text-center text-xs">
                    <span className={`font-bold tabular-nums ${better1 ? 'text-sky-400' : 'text-white/50'}`}>
                      {v1}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                      {label}
                    </span>
                    <span className={`font-bold tabular-nums ${better2 ? 'text-amber-400' : 'text-white/50'}`}>
                      {v2}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Win count */}
            <div className="mt-4 grid grid-cols-3 items-center gap-1 border-t border-white/6 pt-3 text-center text-xs">
              <span className="font-bold text-sky-400">
                {labels.filter((_, i) => s1[i] > s2[i]).length}
              </span>
              <span className="text-[10px] text-white/30 uppercase tracking-wider">wins</span>
              <span className="font-bold text-amber-400">
                {labels.filter((_, i) => s2[i] > s1[i]).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayerBadge({ player }: { player: Player }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-bold" style={{ color: getRatingColor(player.overall) }}>
        {player.overall}
      </span>
      <span
        className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white uppercase"
        style={{ backgroundColor: getPositionColor(player.position) }}
      >
        {player.position}
      </span>
      <span className="text-[10px] font-semibold text-white/70 text-center leading-tight">
        {player.name.split(' ').slice(-1)[0]}
      </span>
      <span className="text-[9px] text-white/30">{player.flag}</span>
    </div>
  )
}
