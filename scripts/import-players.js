// Run: node scripts/import-players.js
// Reads FC26_20250921.csv from project root, outputs public/players.json

const fs = require('fs')
const path = require('path')

// ── CSV parser ────────────────────────────────────────────────────────────────
function parseCSVLine(line) {
  const fields = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { field += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      fields.push(field); field = ''
    } else {
      field += ch
    }
  }
  fields.push(field)
  return fields
}

// ── Flags ────────────────────────────────────────────────────────────────────
const FLAGS = {
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'France': '🇫🇷', 'Brazil': '🇧🇷', 'Spain': '🇪🇸', 'Germany': '🇩🇪',
  'Argentina': '🇦🇷', 'Portugal': '🇵🇹', 'Netherlands': '🇳🇱', 'Belgium': '🇧🇪',
  'Italy': '🇮🇹', 'Uruguay': '🇺🇾', 'Croatia': '🇭🇷', 'Morocco': '🇲🇦',
  'Senegal': '🇸🇳', 'Nigeria': '🇳🇬', 'Egypt': '🇪🇬', 'Japan': '🇯🇵',
  'South Korea': '🇰🇷', 'Mexico': '🇲🇽', 'Colombia': '🇨🇴', 'Chile': '🇨🇱',
  'Peru': '🇵🇪', 'Ecuador': '🇪🇨', 'Paraguay': '🇵🇾', 'Venezuela': '🇻🇪',
  'Bolivia': '🇧🇴', 'Poland': '🇵🇱', 'Norway': '🇳🇴', 'Denmark': '🇩🇰',
  'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Austria': '🇦🇹', 'Czech Republic': '🇨🇿',
  'Czechia': '🇨🇿', 'Slovakia': '🇸🇰', 'Hungary': '🇭🇺', 'Romania': '🇷🇴',
  'Serbia': '🇷🇸', 'Slovenia': '🇸🇮', 'North Macedonia': '🇲🇰', 'Albania': '🇦🇱',
  'Kosovo': '🇽🇰', 'Bosnia & Herzegovina': '🇧🇦', 'Montenegro': '🇲🇪',
  'Turkey': '🇹🇷', 'Ukraine': '🇺🇦', 'Russia': '🇷🇺', 'Greece': '🇬🇷',
  'Bulgaria': '🇧🇬', 'Cyprus': '🇨🇾', 'Republic of Ireland': '🇮🇪',
  'Ireland': '🇮🇪', 'United States': '🇺🇸', 'Canada': '🇨🇦', 'Jamaica': '🇯🇲',
  'Costa Rica': '🇨🇷', 'Panama': '🇵🇦', 'Honduras': '🇭🇳', 'Guatemala': '🇬🇹',
  'El Salvador': '🇸🇻', 'Trinidad & Tobago': '🇹🇹', 'Cuba': '🇨🇺',
  'Ivory Coast': '🇨🇮', "Côte d'Ivoire": '🇨🇮', 'Ghana': '🇬🇭',
  'Cameroon': '🇨🇲', 'Mali': '🇲🇱', 'Guinea': '🇬🇳', 'Burkina Faso': '🇧🇫',
  'DR Congo': '🇨🇩', 'Congo': '🇨🇬', 'Gabon': '🇬🇦', 'Benin': '🇧🇯',
  'Tunisia': '🇹🇳', 'Algeria': '🇩🇿', 'South Africa': '🇿🇦', 'Kenya': '🇰🇪',
  'Ethiopia': '🇪🇹', 'Cape Verde': '🇨🇻', 'Guinea-Bissau': '🇬🇼',
  'Sierra Leone': '🇸🇱', 'Liberia': '🇱🇷', 'Togo': '🇹🇬', 'Niger': '🇳🇪',
  'Saudi Arabia': '🇸🇦', 'Iran': '🇮🇷', 'Australia': '🇦🇺', 'New Zealand': '🇳🇿',
  'China': '🇨🇳', 'India': '🇮🇳', 'Finland': '🇫🇮', 'Iceland': '🇮🇸',
  'Luxembourg': '🇱🇺', 'Andorra': '🇦🇩', 'Israel': '🇮🇱', 'Georgia': '🇬🇪',
  'Armenia': '🇦🇲', 'Azerbaijan': '🇦🇿', 'Kazakhstan': '🇰🇿', 'Latvia': '🇱🇻',
  'Lithuania': '🇱🇹', 'Estonia': '🇪🇪', 'Belarus': '🇧🇾', 'Moldova': '🇲🇩',
  'Northern Ireland': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Finland': '🇫🇮', 'Philippines': '🇵🇭',
  'Zimbabwe': '🇿🇼', 'Zambia': '🇿🇲', 'Tanzania': '🇹🇿', 'Uganda': '🇺🇬',
  'Angola': '🇦🇴', 'Mozambique': '🇲🇿', 'Madagascar': '🇲🇬', 'Rwanda': '🇷🇼',
  'Iraq': '🇮🇶', 'Syria': '🇸🇾', 'Jordan': '🇯🇴', 'Lebanon': '🇱🇧',
  'United Arab Emirates': '🇦🇪', 'Qatar': '🇶🇦', 'Kuwait': '🇰🇼',
  'Bahrain': '🇧🇭', 'Oman': '🇴🇲', 'Yemen': '🇾🇪', 'Libya': '🇱🇾',
  'Sudan': '🇸🇩', 'Somalia': '🇸🇴', 'Eritrea': '🇪🇷', 'Djibouti': '🇩🇯',
  'Indonesia': '🇮🇩', 'Vietnam': '🇻🇳', 'Thailand': '🇹🇭', 'Malaysia': '🇲🇾',
  'Myanmar': '🇲🇲', 'Pakistan': '🇵🇰', 'Bangladesh': '🇧🇩', 'Sri Lanka': '🇱🇰',
  'Nepal': '🇳🇵', 'Afghanistan': '🇦🇫', 'Uzbekistan': '🇺🇿', 'Kyrgyzstan': '🇰🇬',
  'Tajikistan': '🇹🇯', 'Turkmenistan': '🇹🇲', 'Mongolia': '🇲🇳',
  'Dominican Republic': '🇩🇴', 'Haiti': '🇭🇹', 'Nicaragua': '🇳🇮',
  'Belize': '🇧🇿', 'Suriname': '🇸🇷', 'Guyana': '🇬🇾',
}

// ── Playstyle extraction ──────────────────────────────────────────────────────
const KNOWN_PLAYSTYLES = new Set([
  'Finesse Shot', 'Power Shot', 'Power Header', 'Chip Shot', 'Low Driven Shot',
  'Acrobatic', 'Dead Ball', 'Long Ball Pass', 'Through Pass', 'Tiki Taka',
  'Trickster', 'Rapid', 'Relentless', 'Press Proven', 'Technical',
  'Intercept', 'Jockey', 'Slide Tackle', 'Block', 'Bruiser', 'Aerial Fortress',
  'Gamechanger', 'Inventive', 'First Touch',
  'Far Throw', 'Footwork', 'Rush Out', 'Far Reach',
])

function extractPlaystyles(traitsStr) {
  if (!traitsStr) return []
  return traitsStr
    .split(',')
    .map(t => t.trim().replace(/ \+$/, '').trim())
    .filter(t => KNOWN_PLAYSTYLES.has(t))
    .slice(0, 5)
}

// ── Main ──────────────────────────────────────────────────────────────────────
const csvPath = path.join(__dirname, '..', 'FC26_20250921.csv')
const outPath = path.join(__dirname, '..', 'public', 'players.json')

const raw = fs.readFileSync(csvPath, 'utf8').replace(/\r/g, '')
const lines = raw.split('\n')
const headers = parseCSVLine(lines[0])

const idx = (name) => {
  const i = headers.indexOf(name)
  if (i === -1) throw new Error(`Column not found: ${name}`)
  return i
}

const COL = {
  id:            idx('player_id'),
  name:          idx('short_name'),
  positions:     idx('player_positions'),
  overall:       idx('overall'),
  age:           idx('age'),
  height:        idx('height_cm'),
  league:        idx('league_name'),
  club:          idx('club_name'),
  nationality:   idx('nationality_name'),
  foot:          idx('preferred_foot'),
  weakFoot:      idx('weak_foot'),
  skillMoves:    idx('skill_moves'),
  traits:        idx('player_traits'),
  pace:          idx('pace'),
  shooting:      idx('shooting'),
  passing:       idx('passing'),
  dribbling:     idx('dribbling'),
  defending:     idx('defending'),
  physic:        idx('physic'),
  gkDiving:      idx('goalkeeping_diving'),
  gkHandling:    idx('goalkeeping_handling'),
  gkKicking:     idx('goalkeeping_kicking'),
  gkPositioning: idx('goalkeeping_positioning'),
  gkReflexes:    idx('goalkeeping_reflexes'),
  gkSpeed:       idx('goalkeeping_speed'),
  image:         idx('player_face_url'),
}

const seen = new Map() // player_id → { update, idx }
const parsed = []

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim()
  if (!line) continue
  const f = parseCSVLine(line)

  const overall = parseInt(f[COL.overall])
  if (isNaN(overall) || overall < 65) continue

  const pid = f[COL.id]
  const updateNum = parseInt(f[headers.indexOf('fifa_update')]) || 0

  // Keep only latest update per player
  if (seen.has(pid) && seen.get(pid).update >= updateNum) continue
  seen.set(pid, { update: updateNum, idx: parsed.length })

  const position = (f[COL.positions] || 'CM').split(',')[0].trim()
  const nationality = f[COL.nationality] || ''
  const isGK = position === 'GK'

  const player = {
    id:           parseInt(pid),
    name:         f[COL.name],
    overall,
    position,
    nationality,
    flag:         FLAGS[nationality] || '🌍',
    club:         f[COL.club],
    league:       f[COL.league],
    age:          parseInt(f[COL.age]) || 0,
    height:       parseInt(f[COL.height]) || 0,
    preferredFoot: f[COL.foot] || 'Right',
    weakFoot:     parseInt(f[COL.weakFoot]) || 3,
    skillMoves:   parseInt(f[COL.skillMoves]) || 2,
    pace:         parseInt(f[COL.pace]) || 0,
    shooting:     parseInt(f[COL.shooting]) || 0,
    passing:      parseInt(f[COL.passing]) || 0,
    dribbling:    parseInt(f[COL.dribbling]) || 0,
    defending:    parseInt(f[COL.defending]) || 0,
    physical:     parseInt(f[COL.physic]) || 0,
    playstyles:   extractPlaystyles(f[COL.traits]),
    image:        f[COL.image] || '',
  }

  if (isGK) {
    player.gkDiving      = parseInt(f[COL.gkDiving]) || 0
    player.gkHandling    = parseInt(f[COL.gkHandling]) || 0
    player.gkKicking     = parseInt(f[COL.gkKicking]) || 0
    player.gkReflexes    = parseInt(f[COL.gkReflexes]) || 0
    player.gkSpeed       = parseInt(f[COL.gkSpeed]) || 0
    player.gkPositioning = parseInt(f[COL.gkPositioning]) || 0
  }

  if (seen.get(pid).idx < parsed.length) {
    parsed[seen.get(pid).idx] = player
  } else {
    parsed.push(player)
  }
}

// Sort by overall descending
parsed.sort((a, b) => b.overall - a.overall)

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(parsed))
console.log(`✓ Exported ${parsed.length} players to public/players.json`)
