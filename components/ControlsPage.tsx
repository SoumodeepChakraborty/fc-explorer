'use client'

import { useState, useMemo } from 'react'
import { CONTROLS, Control, ControlCategory } from '@/data/controls'

const norm = (s: string) => s.toLowerCase()

function Btn({ label }: { label: string }) {
  const base = 'inline-flex items-center justify-center rounded-md font-bold text-[11px] leading-none px-1.5 py-1 min-w-[22px]'
  if (label === '○') return <span className={`${base} bg-red-500/15 border border-red-400/40 text-red-300`}>○</span>
  if (label === '✕') return <span className={`${base} bg-blue-500/15 border border-blue-400/40 text-blue-300`}>✕</span>
  if (label === '□') return <span className={`${base} bg-pink-500/15 border border-pink-400/40 text-pink-300`}>□</span>
  if (label === '△') return <span className={`${base} bg-green-500/15 border border-green-400/40 text-green-300`}>△</span>
  if (label === 'Options') return <span className={`${base} bg-white/6 border border-white/12 text-white/50 text-[10px]`}>···</span>
  return <span className={`${base} bg-white/8 border border-white/12 text-white/60`}>{label}</span>
}

function InputCombo({ buttons }: { buttons: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-end">
      {buttons.map((btn, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-white/20 text-[10px] select-none">+</span>}
          <Btn label={btn} />
        </span>
      ))}
    </div>
  )
}

function CategoryCard({ category, query }: { category: ControlCategory; query: string }) {
  const controls = useMemo(() => {
    if (!query) return category.controls
    return category.controls.filter(c =>
      norm(c.action).includes(norm(query)) ||
      (c.note && norm(c.note).includes(norm(query)))
    )
  }, [category.controls, query])

  if (controls.length === 0) return null

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/2">
        <span className="text-base leading-none">{category.emoji}</span>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/70">{category.name}</h2>
        <span className="ml-auto text-[10px] text-white/25">{controls.length}</span>
      </div>
      <div className="divide-y divide-white/4">
        {controls.map((control: Control, i: number) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/3 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/85 leading-tight">{control.action}</p>
              {control.note && (
                <p className="text-[10px] text-white/35 mt-0.5">{control.note}</p>
              )}
            </div>
            <InputCombo buttons={control.buttons} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ControlsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const visibleCategories = useMemo(() => {
    const cats = activeCategory
      ? CONTROLS.filter(c => c.id === activeCategory)
      : CONTROLS
    if (!search) return cats
    return cats.filter(cat =>
      cat.controls.some(c =>
        norm(c.action).includes(norm(search)) ||
        (c.note && norm(c.note).includes(norm(search)))
      )
    )
  }, [search, activeCategory])

  const totalVisible = useMemo(() =>
    visibleCategories.reduce((sum, cat) => {
      if (!search) return sum + cat.controls.length
      return sum + cat.controls.filter(c =>
        norm(c.action).includes(norm(search)) ||
        (c.note && norm(c.note).includes(norm(search)))
      ).length
    }, 0)
  , [visibleCategories, search])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Controls toolbar */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/6 px-6 py-3 bg-white/1">
        {/* Search */}
        <div className="relative w-64">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search controls..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/6 py-2 pl-8 pr-3 text-xs text-white placeholder-white/30 outline-none focus:border-white/20"
          />
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-colors ${
              activeCategory === null ? 'bg-violet-500/20 text-violet-300' : 'text-white/35 hover:text-white/60'
            }`}
          >
            All
          </button>
          {CONTROLS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-colors ${
                activeCategory === cat.id ? 'bg-violet-500/20 text-violet-300' : 'text-white/35 hover:text-white/60'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <span className="ml-auto text-[10px] text-white/25 flex-shrink-0">
          {totalVisible} controls
        </span>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {visibleCategories.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-white/20">
            <span className="text-4xl">🎮</span>
            <p className="text-sm">No controls match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} query={search} />
            ))}
          </div>
        )}

        {/* Legend */}
        {!search && !activeCategory && (
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[10px] text-white/20 mr-1">Buttons:</span>
            {[
              { label: '○', desc: 'Circle' },
              { label: '✕', desc: 'Cross' },
              { label: '□', desc: 'Square' },
              { label: '△', desc: 'Triangle' },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-1.5">
                <Btn label={b.label} />
                <span className="text-[10px] text-white/25">{b.desc}</span>
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <Btn label="L1" />
              <span className="text-[10px] text-white/25">Shoulder / Trigger</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Btn label="LS" />
              <span className="text-[10px] text-white/25">Left Stick</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Btn label="RS" />
              <span className="text-[10px] text-white/25">Right Stick</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
