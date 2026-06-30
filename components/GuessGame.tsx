'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Player, getStatLabels, getPlayerStats, getPositionGroup, getRatingColor } from '@/types/player'

interface Props {
  players: Player[]
}

type GameState = 'idle' | 'playing' | 'won' | 'lost'

const MAX_GUESSES = 6

const POSITION_LABELS: Record<string, string> = {
  GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', ATT: 'Attacker',
}

const HINTS = [
  {
    label: 'Nationality', icon: '🌍',
    bg: 'bg-amber-500/12', border: 'border-amber-400/35', text: 'text-amber-200', tag: 'text-amber-400/80',
    render: (p: Player) => `${p.flag}  ${p.nationality}`,
  },
  {
    label: 'League', icon: '🏆',
    bg: 'bg-sky-500/12', border: 'border-sky-400/35', text: 'text-sky-200', tag: 'text-sky-400/80',
    render: (p: Player) => p.league,
  },
  {
    label: 'Age', icon: '🎂',
    bg: 'bg-emerald-500/12', border: 'border-emerald-400/35', text: 'text-emerald-200', tag: 'text-emerald-400/80',
    render: (p: Player) => `${p.age} years old`,
  },
  {
    label: 'Foot & Skills', icon: '⭐',
    bg: 'bg-violet-500/12', border: 'border-violet-400/35', text: 'text-violet-200', tag: 'text-violet-400/80',
    render: (p: Player) => `${p.preferredFoot} foot · ${'★'.repeat(p.skillMoves)}${'☆'.repeat(5 - p.skillMoves)}`,
  },
  {
    label: 'Club', icon: '🏟️',
    bg: 'bg-orange-500/12', border: 'border-orange-400/35', text: 'text-orange-200', tag: 'text-orange-400/80',
    render: (p: Player) => p.club,
  },
]

const DIFFICULTY = [
  { label: 'Easy',   rating: 75, emoji: '😌', activeCls: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' },
  { label: 'Medium', rating: 80, emoji: '😤', activeCls: 'bg-sky-500/20 border-sky-400/50 text-sky-300' },
  { label: 'Hard',   rating: 85, emoji: '😰', activeCls: 'bg-amber-500/20 border-amber-400/50 text-amber-300' },
  { label: 'Elite',  rating: 90, emoji: '💀', activeCls: 'bg-red-500/20 border-red-400/50 text-red-300' },
]

const norm = (s: string) => s.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase()

function statColor(v: number) {
  if (v >= 85) return '#4ade80'
  if (v >= 70) return '#facc15'
  if (v >= 55) return '#fb923c'
  return '#f87171'
}

// ── Guess dot ─────────────────────────────────────────────────────────────────
function GuessDot({ state }: { state: 'unused' | 'wrong' | 'correct' }) {
  if (state === 'correct') return (
    <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)] animate-pop-in" />
  )
  if (state === 'wrong') return (
    <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_6px_1px_rgba(248,113,113,0.5)]" />
  )
  return <div className="h-3 w-3 rounded-full border-2 border-white/20" />
}

export default function GuessGame({ players }: Props) {
  const [target, setTarget]       = useState<Player | null>(null)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [guesses, setGuesses]     = useState<string[]>([])
  const [input, setInput]         = useState('')
  const [showDrop, setShowDrop]   = useState(false)
  const [minRating, setMinRating] = useState(80)
  const [league, setLeague]       = useState('')
  const [score, setScore]         = useState(0)
  const [shakeId, setShakeId]     = useState(0)
  const inputRef                  = useRef<HTMLInputElement>(null)
  const cardRef                   = useRef<HTMLDivElement>(null)

  const leagues = useMemo(() => [...new Set(players.map(p => p.league))].sort(), [players])
  const pool    = useMemo(() =>
    players.filter(p => p.overall >= minRating && (!league || p.league === league))
  , [players, minRating, league])

  const suggestions = useMemo(() => {
    if (input.length < 2) return []
    const q = norm(input)
    return players.filter(p => norm(p.name).includes(q)).slice(0, 8)
  }, [input, players])

  // shake card on wrong guess
  useEffect(() => {
    if (!shakeId) return
    const el = cardRef.current
    if (!el) return
    el.classList.add('animate-shake')
    const t = setTimeout(() => el.classList.remove('animate-shake'), 400)
    return () => clearTimeout(t)
  }, [shakeId])

  function startGame() {
    if (!pool.length) return
    setTarget(pool[Math.floor(Math.random() * pool.length)])
    setGuesses([])
    setInput('')
    setShowDrop(false)
    setGameState('playing')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  function submitGuess(name: string) {
    if (!target || gameState !== 'playing') return
    const trimmed = name.trim()
    if (!trimmed) return
    setInput('')
    setShowDrop(false)
    const next = [...guesses, trimmed]
    setGuesses(next)
    if (norm(trimmed) === norm(target.name)) {
      setGameState('won')
      setScore(s => s + 1)
    } else if (next.length >= MAX_GUESSES) {
      setGameState('lost')
    } else {
      setShakeId(id => id + 1)
    }
  }

  // ── Idle screen ─────────────────────────────────────────────────────────────
  if (gameState === 'idle') {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-6">

          {/* Title card */}
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-900/30 to-transparent p-8 text-center">
            <div className="text-6xl mb-4 animate-celebrate">🎯</div>
            <h1 className="text-2xl font-black text-white tracking-tight">Guess the Player</h1>
            <p className="mt-2 text-sm text-white/40 leading-relaxed">
              Stats shown. Name & photo hidden.<br />Each wrong guess reveals a clue.
            </p>
            {score > 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
                <span className="text-emerald-400 text-sm">🔥</span>
                <span className="text-xs font-bold text-emerald-300">{score} correct this session</span>
              </div>
            )}
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 text-center">Difficulty</p>
            <div className="grid grid-cols-4 gap-2">
              {DIFFICULTY.map(d => (
                <button key={d.rating} onClick={() => setMinRating(d.rating)}
                  className={`flex flex-col items-center gap-1 rounded-xl border py-3 text-xs font-bold transition-all ${
                    minRating === d.rating
                      ? d.activeCls
                      : 'border-white/8 text-white/30 hover:text-white/60 hover:border-white/15'
                  }`}>
                  <span className="text-xl">{d.emoji}</span>
                  <span>{d.label}</span>
                  <span className="text-[9px] font-normal opacity-70">{d.rating}+ OVR</span>
                </button>
              ))}
            </div>
          </div>

          {/* League filter */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 text-center">League <span className="text-white/20 normal-case font-normal">— optional</span></p>
            <select value={league} onChange={e => setLeague(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0d1020] py-2.5 px-3 text-sm text-white/70 outline-none focus:border-white/20">
              <option value="">All leagues</option>
              {leagues.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="text-center text-xs text-white/25">
            {pool.length.toLocaleString()} players in pool
          </div>

          <button onClick={startGame} disabled={!pool.length}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600/80 to-violet-500/80 border border-violet-400/30 py-3.5 text-sm font-black text-white tracking-wide hover:from-violet-500/80 hover:to-violet-400/80 transition-all shadow-lg shadow-violet-900/40 disabled:opacity-30">
            START GAME →
          </button>
        </div>
      </div>
    )
  }

  if (!target) return null

  const statLabels  = getStatLabels(target.position)
  const stats       = getPlayerStats(target)
  const posGroup    = getPositionGroup(target.position)
  const isFinished  = gameState === 'won' || gameState === 'lost'
  const hintsShown  = Math.min(guesses.length, HINTS.length)
  const wrongGuesses = guesses.filter(g => norm(g) !== norm(target.name))

  // dot states
  const dots = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i >= guesses.length) return 'unused' as const
    const g = guesses[i]
    return norm(g) === norm(target.name) ? 'correct' as const : 'wrong' as const
  })

  // ── Game screen ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-1 overflow-y-auto justify-center px-4 py-5">
      <div className="w-full max-w-lg flex flex-col gap-4">

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2.5">
          {dots.map((d, i) => <GuessDot key={i} state={d} />)}
        </div>

        {/* Mystery player card */}
        <div ref={cardRef}
          className={`rounded-2xl border p-5 flex flex-col gap-5 transition-all duration-300 ${
            gameState === 'won'
              ? 'border-emerald-400/40 bg-emerald-900/15 shadow-[0_0_40px_4px_rgba(52,211,153,0.08)]'
              : gameState === 'lost'
              ? 'border-red-400/30 bg-red-900/10'
              : 'border-white/8 bg-white/3'
          }`}>

          {/* Avatar + identity */}
          <div className="flex items-center gap-4">
            <div className={`h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center ${
              !isFinished ? 'animate-glow-pulse bg-white/5 border border-violet-400/20' : 'bg-white/6 border border-white/10'
            }`}>
              {isFinished && target.image
                ? <img src={target.image} alt={target.name} width={64} height={64}
                    referrerPolicy="no-referrer" className="h-full w-full object-cover animate-pop-in" />
                : <span className="text-3xl select-none">{isFinished ? '👤' : '❓'}</span>
              }
            </div>

            <div className="flex-1 min-w-0">
              {gameState === 'won' && (
                <p className="text-xs font-bold text-emerald-400 mb-0.5 animate-slide-down">🎉 Correct!</p>
              )}
              {gameState === 'lost' && (
                <p className="text-xs font-bold text-red-400 mb-0.5">The answer was:</p>
              )}
              <p className={`text-xl font-black truncate ${isFinished ? 'text-white animate-slide-down' : 'text-white/20'}`}>
                {isFinished ? target.name : '??? Player'}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-base font-black tabular-nums" style={{ color: getRatingColor(target.overall) }}>
                  {target.overall}
                </span>
                <span className="text-xs text-white/40">{POSITION_LABELS[posGroup] ?? posGroup}</span>
                {isFinished && (
                  <span className="text-xs text-white/30 truncate">{target.flag} {target.nationality}</span>
                )}
              </div>
              {isFinished && (
                <p className="text-xs text-white/30 mt-0.5 truncate animate-slide-down">{target.club}</p>
              )}
            </div>

            {/* Guesses left badge */}
            {!isFinished && (
              <div className="flex-shrink-0 flex flex-col items-center rounded-xl border border-white/8 bg-white/4 px-3 py-2">
                <span className="text-xl font-black text-white tabular-nums">{MAX_GUESSES - guesses.length}</span>
                <span className="text-[9px] text-white/30 uppercase tracking-wide">left</span>
              </div>
            )}
            {gameState === 'won' && (
              <div className="flex-shrink-0 flex flex-col items-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
                <span className="text-xl">🏆</span>
                <span className="text-[9px] text-emerald-400/80 uppercase tracking-wide">{guesses.length}/{MAX_GUESSES}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-2">
            {statLabels.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">{label}</span>
                <span className="text-2xl font-black tabular-nums leading-none" style={{ color: statColor(stats[i]) }}>
                  {stats[i]}
                </span>
                <div className="h-1.5 w-full rounded-full bg-white/8">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats[i]}%`, backgroundColor: statColor(stats[i]) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hints */}
        <div className="flex flex-col gap-1.5">
          {HINTS.map((hint, i) => {
            const revealed = i < hintsShown || isFinished
            return (
              <div key={hint.label}
                className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-all duration-300 ${
                  revealed
                    ? `${hint.bg} ${hint.border} animate-slide-down`
                    : 'border-white/5 bg-transparent'
                }`}>
                <span className="text-base leading-none flex-shrink-0">
                  {revealed ? hint.icon : '🔒'}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider w-24 flex-shrink-0 ${
                  revealed ? hint.tag : 'text-white/15'
                }`}>
                  {hint.label}
                </span>
                {revealed
                  ? <span className={`text-sm font-semibold ${hint.text}`}>{hint.render(target)}</span>
                  : <span className="text-xs text-white/15">Unlocks after guess {i + 1}</span>
                }
              </div>
            )
          })}
        </div>

        {/* Wrong guesses */}
        {wrongGuesses.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {wrongGuesses.map((g, i) => (
              <span key={i} className="flex items-center gap-1 rounded-lg border border-red-400/20 bg-red-500/8 px-2.5 py-1 text-xs text-red-300/50">
                <span>✗</span>
                <span className="line-through">{g}</span>
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        {!isFinished ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a player name…"
              value={input}
              onChange={e => { setInput(e.target.value); setShowDrop(true) }}
              onKeyDown={e => {
                if (e.key === 'Enter') submitGuess(input)
                if (e.key === 'Escape') setShowDrop(false)
              }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              className="w-full rounded-xl border border-violet-400/25 bg-white/6 py-3.5 px-4 text-sm text-white placeholder-white/25 outline-none focus:border-violet-400/60 focus:bg-white/8 transition-colors shadow-[inset_0_0_0_1px_rgba(139,92,246,0.1)] focus:shadow-[inset_0_0_0_1px_rgba(139,92,246,0.25),0_0_16px_rgba(139,92,246,0.12)]"
            />
            {showDrop && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 mt-1.5 rounded-xl border border-white/10 bg-[#0c1120] overflow-hidden shadow-2xl shadow-black/60">
                {suggestions.map(p => (
                  <button key={p.id} onMouseDown={() => submitGuess(p.name)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-white/6 transition-colors border-b border-white/4 last:border-0">
                    <span className="text-base leading-none">{p.flag}</span>
                    <span className="text-sm text-white/85 flex-1">{p.name}</span>
                    <span className="text-[10px] text-white/30 tabular-nums">{p.overall} · {p.position}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={startGame}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600/80 to-violet-500/80 border border-violet-400/30 py-3 text-sm font-black text-white tracking-wide hover:from-violet-500/80 hover:to-violet-400/80 transition-all shadow-lg shadow-violet-900/40">
              Play Again →
            </button>
            <button onClick={() => setGameState('idle')}
              className="rounded-xl border border-white/10 px-4 py-3 text-xs text-white/40 hover:text-white/60 transition-colors">
              Settings
            </button>
          </div>
        )}

        {/* Give up */}
        {gameState === 'playing' && guesses.length > 0 && (
          <button onClick={() => setGameState('lost')}
            className="text-center text-[10px] text-white/15 hover:text-white/35 transition-colors py-1">
            Give up
          </button>
        )}
      </div>
    </div>
  )
}
