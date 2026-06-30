# ⚽ FC Explorer

A player stats explorer for **EA FC 26** — built for PS5 sessions with friends. Browse 10,000+ players, compare stats side by side, learn controls, and test your player knowledge with a guessing game.

---

## Features

### 🔍 Player Explorer

- **10,654 players** loaded from the official EA FC 26 dataset
- Filter by position, rating, league, nationality, preferred foot, skill moves, age range, and playstyles
- Sort by any stat (OVR, PAC, SHO, PAS, DRI, DEF, PHY, AGE)
- Real player face photos via sofifa CDN
- Goalkeeper cards show GK-specific stats (DIV / HAN / KIC / REF / SPD / POS)

### ⚖️ Side-by-Side Compare

- Select any 2 players and compare them in a modal
- Radar chart overlay (recharts) showing both stat profiles
- Stat-by-stat table with win counts

### 🎮 PS5 Controls Reference

- 90+ controls across 9 categories: Shooting, Passing, Dribbling, Skill Moves, Defending, Set Pieces, Goalkeeper, Off Ball, General
- PS5 button chips (○ ✕ □ △ L1/R1/L2/R2) color-coded by button type
- Search across all controls, filter by category

### 🎯 Guess the Player

- Random player drawn from a configurable pool (difficulty: Easy / Medium / Hard / Elite)
- Stats shown — no name, no photo
- 6 guesses, each wrong guess reveals a new hint: Nationality → League → Age → Foot & Skills → Club
- Autocomplete input from the full player database
- Shake animation on wrong guess, win/loss celebration states, session score tracker

---

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Recharts](https://recharts.org) — radar chart in compare modal
- Player data from [EA FC 26 dataset on Kaggle](https://www.kaggle.com/)

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/SoumodeepChakraborty/fc-explorer.git
cd fc-explorer
npm install
```

### 2. Add the player data

The CSV is not committed (it's 10 MB). Download `FC26_20250921.csv` from Kaggle and place it in the project root, then run:

```bash
node scripts/import-players.js
```

This generates `public/players.json` (10,654 players, ~4 MB).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```text
fc-explorer/
├── app/
│   ├── page.tsx          # Main page — tab switcher + explorer logic
│   └── globals.css       # Dark theme, scrollbars, game animations
├── components/
│   ├── PlayerCard.tsx    # Individual player card
│   ├── FilterSidebar.tsx # All filter controls
│   ├── CompareBar.tsx    # Fixed bottom compare bar
│   ├── CompareModal.tsx  # Radar chart compare modal
│   ├── ControlsPage.tsx  # PS5 controls reference
│   └── GuessGame.tsx     # Guess the player game
├── data/
│   └── controls.ts       # PS5 controls dataset
├── types/
│   └── player.ts         # Player interface + stat helpers
└── scripts/
    └── import-players.js # CSV → public/players.json
```

---

## License

MIT
