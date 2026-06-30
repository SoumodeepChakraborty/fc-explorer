'use client'

import { Player, getRatingColor, getPositionColor } from '@/types/player'

interface Props {
  compareList: Player[]
  onRemove: (id: number) => void
  onCompare: () => void
  onClear: () => void
}

export default function CompareBar({ compareList, onRemove, onCompare, onClear }: Props) {
  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-4 border-t border-white/8 bg-[#080c14]/95 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Compare</span>
        <div className="flex items-center gap-2">
          {compareList.map(player => (
            <div
              key={player.id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5"
            >
              <span className="text-xs font-bold" style={{ color: getRatingColor(player.overall) }}>
                {player.overall}
              </span>
              <span
                className="rounded px-1 py-0.5 text-[9px] font-bold text-white uppercase"
                style={{ backgroundColor: getPositionColor(player.position) }}
              >
                {player.position}
              </span>
              <span className="text-xs font-medium text-white/80">
                {player.name.split(' ').slice(-1)[0]}
              </span>
              <span className="text-sm">{player.flag}</span>
              <button
                onClick={() => onRemove(player.id)}
                className="ml-1 text-white/30 transition-colors hover:text-white/70"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {compareList.length < 2 && (
            <div className="flex h-8 w-32 items-center justify-center rounded-xl border border-dashed border-white/15 text-[10px] text-white/25">
              Pick one more
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="rounded-lg px-3 py-2 text-xs text-white/35 transition-colors hover:text-white/60"
        >
          Clear
        </button>
        <button
          onClick={onCompare}
          disabled={compareList.length < 2}
          className="rounded-xl bg-violet-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-900/40 transition-all hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-white/25 disabled:shadow-none"
        >
          Compare now →
        </button>
      </div>
    </div>
  )
}
