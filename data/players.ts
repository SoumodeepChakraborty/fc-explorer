import { Player } from '@/types/player'

export const players: Player[] = [
  // ── Real Madrid ──────────────────────────────────────────────────────────
  {
    id: 1, name: 'Kylian Mbappé', overall: 91, position: 'ST',
    nationality: 'French', flag: '🇫🇷', club: 'Real Madrid', league: 'La Liga',
    age: 26, height: 178, preferredFoot: 'Right', weakFoot: 4, skillMoves: 5,
    pace: 97, shooting: 89, passing: 80, dribbling: 92, defending: 36, physical: 78,
    playstyles: ['Rapid', 'Finesse Shot', 'Trickster'],
  },
  {
    id: 2, name: 'Vinicius Jr', overall: 91, position: 'LW',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'Real Madrid', league: 'La Liga',
    age: 24, height: 176, preferredFoot: 'Right', weakFoot: 3, skillMoves: 5,
    pace: 95, shooting: 84, passing: 80, dribbling: 94, defending: 25, physical: 73,
    playstyles: ['Trickster', 'Rapid', 'Finesse Shot'],
  },
  {
    id: 3, name: 'Jude Bellingham', overall: 90, position: 'CAM',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Real Madrid', league: 'La Liga',
    age: 21, height: 186, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 73, shooting: 82, passing: 86, dribbling: 88, defending: 68, physical: 83,
    playstyles: ['Power Header', 'Through Pass', 'Relentless'],
  },
  {
    id: 4, name: 'Federico Valverde', overall: 87, position: 'CM',
    nationality: 'Uruguayan', flag: '🇺🇾', club: 'Real Madrid', league: 'La Liga',
    age: 26, height: 182, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 88, shooting: 77, passing: 80, dribbling: 83, defending: 75, physical: 84,
    playstyles: ['Power Shot', 'Relentless'],
  },
  {
    id: 5, name: 'Luka Modrić', overall: 86, position: 'CM',
    nationality: 'Croatian', flag: '🇭🇷', club: 'Real Madrid', league: 'La Liga',
    age: 39, height: 172, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 67, shooting: 76, passing: 88, dribbling: 87, defending: 72, physical: 70,
    playstyles: ['Tiki Taka', 'Through Pass'],
  },
  {
    id: 6, name: 'Dani Carvajal', overall: 86, position: 'RB',
    nationality: 'Spanish', flag: '🇪🇸', club: 'Real Madrid', league: 'La Liga',
    age: 32, height: 173, preferredFoot: 'Right', weakFoot: 3, skillMoves: 2,
    pace: 75, shooting: 58, passing: 74, dribbling: 75, defending: 85, physical: 76,
    playstyles: ['Intercept', 'Press Proven'],
  },
  {
    id: 7, name: 'Éder Militão', overall: 87, position: 'CB',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'Real Madrid', league: 'La Liga',
    age: 26, height: 186, preferredFoot: 'Right', weakFoot: 3, skillMoves: 2,
    pace: 80, shooting: 45, passing: 64, dribbling: 66, defending: 86, physical: 84,
    playstyles: ['Block', 'Bruiser'],
  },
  {
    id: 8, name: 'Thibaut Courtois', overall: 90, position: 'GK',
    nationality: 'Belgian', flag: '🇧🇪', club: 'Real Madrid', league: 'La Liga',
    age: 32, height: 199, preferredFoot: 'Left', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 88, gkHandling: 90, gkKicking: 78, gkReflexes: 92, gkSpeed: 88, gkPositioning: 85,
    playstyles: ['Far Reach', 'Rush Out'],
  },
  {
    id: 9, name: 'Trent Alexander-Arnold', overall: 87, position: 'RB',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Real Madrid', league: 'La Liga',
    age: 26, height: 175, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 77, shooting: 68, passing: 87, dribbling: 79, defending: 72, physical: 72,
    playstyles: ['Dead Ball', 'Long Ball Pass', 'Through Pass'],
  },

  // ── Manchester City ───────────────────────────────────────────────────────
  {
    id: 10, name: 'Erling Haaland', overall: 91, position: 'ST',
    nationality: 'Norwegian', flag: '🇳🇴', club: 'Manchester City', league: 'Premier League',
    age: 24, height: 194, preferredFoot: 'Left', weakFoot: 4, skillMoves: 3,
    pace: 89, shooting: 95, passing: 67, dribbling: 80, defending: 45, physical: 88,
    playstyles: ['Power Header', 'Power Shot', 'Bruiser'],
  },
  {
    id: 11, name: 'Kevin De Bruyne', overall: 90, position: 'CM',
    nationality: 'Belgian', flag: '🇧🇪', club: 'Manchester City', league: 'Premier League',
    age: 33, height: 181, preferredFoot: 'Right', weakFoot: 5, skillMoves: 4,
    pace: 74, shooting: 82, passing: 93, dribbling: 88, defending: 64, physical: 78,
    playstyles: ['Long Ball Pass', 'Through Pass', 'Power Shot'],
  },
  {
    id: 12, name: 'Phil Foden', overall: 88, position: 'CAM',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Manchester City', league: 'Premier League',
    age: 24, height: 171, preferredFoot: 'Left', weakFoot: 3, skillMoves: 4,
    pace: 82, shooting: 82, passing: 84, dribbling: 89, defending: 52, physical: 68,
    playstyles: ['Trickster', 'Finesse Shot', 'Tiki Taka'],
  },
  {
    id: 13, name: 'Rodri', overall: 91, position: 'CDM',
    nationality: 'Spanish', flag: '🇪🇸', club: 'Manchester City', league: 'Premier League',
    age: 28, height: 191, preferredFoot: 'Right', weakFoot: 3, skillMoves: 2,
    pace: 68, shooting: 72, passing: 86, dribbling: 80, defending: 88, physical: 82,
    playstyles: ['Intercept', 'Jockey', 'Long Ball Pass'],
  },
  {
    id: 14, name: 'Bernardo Silva', overall: 87, position: 'CM',
    nationality: 'Portuguese', flag: '🇵🇹', club: 'Manchester City', league: 'Premier League',
    age: 29, height: 173, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 79, shooting: 76, passing: 88, dribbling: 88, defending: 55, physical: 72,
    playstyles: ['Tiki Taka', 'Press Proven', 'Trickster'],
  },
  {
    id: 15, name: 'Rúben Dias', overall: 87, position: 'CB',
    nationality: 'Portuguese', flag: '🇵🇹', club: 'Manchester City', league: 'Premier League',
    age: 27, height: 187, preferredFoot: 'Right', weakFoot: 3, skillMoves: 1,
    pace: 76, shooting: 46, passing: 68, dribbling: 65, defending: 88, physical: 84,
    playstyles: ['Block', 'Intercept'],
  },
  {
    id: 16, name: 'Ederson', overall: 88, position: 'GK',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'Manchester City', league: 'Premier League',
    age: 30, height: 188, preferredFoot: 'Left', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 82, gkHandling: 84, gkKicking: 92, gkReflexes: 86, gkSpeed: 82, gkPositioning: 87,
    playstyles: ['Footwork', 'Far Throw'],
  },

  // ── Liverpool ─────────────────────────────────────────────────────────────
  {
    id: 17, name: 'Mohamed Salah', overall: 90, position: 'RW',
    nationality: 'Egyptian', flag: '🇪🇬', club: 'Liverpool', league: 'Premier League',
    age: 32, height: 175, preferredFoot: 'Left', weakFoot: 3, skillMoves: 4,
    pace: 90, shooting: 88, passing: 82, dribbling: 90, defending: 45, physical: 75,
    playstyles: ['Finesse Shot', 'Rapid', 'Trickster'],
  },
  {
    id: 18, name: 'Virgil van Dijk', overall: 88, position: 'CB',
    nationality: 'Dutch', flag: '🇳🇱', club: 'Liverpool', league: 'Premier League',
    age: 33, height: 193, preferredFoot: 'Right', weakFoot: 4, skillMoves: 1,
    pace: 80, shooting: 60, passing: 70, dribbling: 72, defending: 90, physical: 86,
    playstyles: ['Power Header', 'Block', 'Bruiser'],
  },
  {
    id: 19, name: 'Alisson Becker', overall: 89, position: 'GK',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'Liverpool', league: 'Premier League',
    age: 32, height: 191, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 85, gkHandling: 87, gkKicking: 83, gkReflexes: 88, gkSpeed: 85, gkPositioning: 86,
    playstyles: ['Far Reach', 'Footwork'],
  },
  {
    id: 20, name: 'Andrew Robertson', overall: 85, position: 'LB',
    nationality: 'Scottish', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', club: 'Liverpool', league: 'Premier League',
    age: 30, height: 178, preferredFoot: 'Left', weakFoot: 2, skillMoves: 2,
    pace: 84, shooting: 60, passing: 82, dribbling: 76, defending: 82, physical: 76,
    playstyles: ['Press Proven', 'Intercept'],
  },
  {
    id: 21, name: 'Darwin Núñez', overall: 84, position: 'ST',
    nationality: 'Uruguayan', flag: '🇺🇾', club: 'Liverpool', league: 'Premier League',
    age: 25, height: 187, preferredFoot: 'Left', weakFoot: 4, skillMoves: 3,
    pace: 92, shooting: 80, passing: 66, dribbling: 82, defending: 35, physical: 83,
    playstyles: ['Rapid', 'Power Header'],
  },
  {
    id: 22, name: 'Dominik Szoboszlai', overall: 83, position: 'CAM',
    nationality: 'Hungarian', flag: '🇭🇺', club: 'Liverpool', league: 'Premier League',
    age: 23, height: 186, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 76, shooting: 78, passing: 82, dribbling: 83, defending: 58, physical: 74,
    playstyles: ['Dead Ball', 'Power Shot'],
  },
  {
    id: 23, name: 'Alexis Mac Allister', overall: 84, position: 'CM',
    nationality: 'Argentinian', flag: '🇦🇷', club: 'Liverpool', league: 'Premier League',
    age: 25, height: 174, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 72, shooting: 74, passing: 83, dribbling: 82, defending: 70, physical: 72,
    playstyles: ['Tiki Taka', 'Press Proven'],
  },

  // ── Barcelona ─────────────────────────────────────────────────────────────
  {
    id: 24, name: 'Lamine Yamal', overall: 90, position: 'RW',
    nationality: 'Spanish', flag: '🇪🇸', club: 'FC Barcelona', league: 'La Liga',
    age: 17, height: 180, preferredFoot: 'Left', weakFoot: 4, skillMoves: 5,
    pace: 91, shooting: 82, passing: 82, dribbling: 93, defending: 28, physical: 62,
    playstyles: ['Trickster', 'Finesse Shot', 'Rapid'],
  },
  {
    id: 25, name: 'Pedri', overall: 88, position: 'CM',
    nationality: 'Spanish', flag: '🇪🇸', club: 'FC Barcelona', league: 'La Liga',
    age: 22, height: 174, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 72, shooting: 74, passing: 88, dribbling: 88, defending: 65, physical: 68,
    playstyles: ['Tiki Taka', 'Through Pass'],
  },
  {
    id: 26, name: 'Gavi', overall: 86, position: 'CM',
    nationality: 'Spanish', flag: '🇪🇸', club: 'FC Barcelona', league: 'La Liga',
    age: 20, height: 173, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 74, shooting: 72, passing: 85, dribbling: 87, defending: 68, physical: 70,
    playstyles: ['Tiki Taka', 'Press Proven'],
  },
  {
    id: 27, name: 'Raphinha', overall: 85, position: 'RW',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'FC Barcelona', league: 'La Liga',
    age: 27, height: 176, preferredFoot: 'Left', weakFoot: 3, skillMoves: 4,
    pace: 86, shooting: 82, passing: 78, dribbling: 86, defending: 48, physical: 72,
    playstyles: ['Finesse Shot', 'Dead Ball', 'Trickster'],
  },
  {
    id: 28, name: 'Robert Lewandowski', overall: 87, position: 'ST',
    nationality: 'Polish', flag: '🇵🇱', club: 'FC Barcelona', league: 'La Liga',
    age: 36, height: 184, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 72, shooting: 91, passing: 72, dribbling: 83, defending: 44, physical: 80,
    playstyles: ['Power Header', 'Finesse Shot', 'Power Shot'],
  },
  {
    id: 29, name: 'Marc-André ter Stegen', overall: 87, position: 'GK',
    nationality: 'German', flag: '🇩🇪', club: 'FC Barcelona', league: 'La Liga',
    age: 32, height: 187, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 84, gkHandling: 84, gkKicking: 80, gkReflexes: 88, gkSpeed: 82, gkPositioning: 86,
    playstyles: ['Footwork', 'Far Reach'],
  },
  {
    id: 30, name: 'Pau Cubarsí', overall: 83, position: 'CB',
    nationality: 'Spanish', flag: '🇪🇸', club: 'FC Barcelona', league: 'La Liga',
    age: 17, height: 183, preferredFoot: 'Left', weakFoot: 3, skillMoves: 2,
    pace: 76, shooting: 42, passing: 68, dribbling: 66, defending: 84, physical: 76,
    playstyles: ['Intercept', 'Block'],
  },

  // ── Bayern Munich ─────────────────────────────────────────────────────────
  {
    id: 31, name: 'Harry Kane', overall: 90, position: 'ST',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Bayern Munich', league: 'Bundesliga',
    age: 31, height: 188, preferredFoot: 'Right', weakFoot: 4, skillMoves: 3,
    pace: 72, shooting: 93, passing: 83, dribbling: 84, defending: 47, physical: 83,
    playstyles: ['Finesse Shot', 'Power Shot', 'Power Header'],
  },
  {
    id: 32, name: 'Jamal Musiala', overall: 88, position: 'CAM',
    nationality: 'German', flag: '🇩🇪', club: 'Bayern Munich', league: 'Bundesliga',
    age: 21, height: 178, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 81, shooting: 78, passing: 82, dribbling: 90, defending: 46, physical: 73,
    playstyles: ['Trickster', 'Acrobatic', 'Finesse Shot'],
  },
  {
    id: 33, name: 'Leroy Sané', overall: 85, position: 'LW',
    nationality: 'German', flag: '🇩🇪', club: 'Bayern Munich', league: 'Bundesliga',
    age: 28, height: 183, preferredFoot: 'Right', weakFoot: 3, skillMoves: 4,
    pace: 93, shooting: 79, passing: 77, dribbling: 87, defending: 40, physical: 73,
    playstyles: ['Rapid', 'Trickster'],
  },
  {
    id: 34, name: 'Serge Gnabry', overall: 83, position: 'RW',
    nationality: 'German', flag: '🇩🇪', club: 'Bayern Munich', league: 'Bundesliga',
    age: 29, height: 176, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 88, shooting: 80, passing: 74, dribbling: 84, defending: 44, physical: 74,
    playstyles: ['Rapid', 'Finesse Shot'],
  },
  {
    id: 35, name: 'Alphonso Davies', overall: 84, position: 'LB',
    nationality: 'Canadian', flag: '🇨🇦', club: 'Bayern Munich', league: 'Bundesliga',
    age: 24, height: 177, preferredFoot: 'Left', weakFoot: 3, skillMoves: 4,
    pace: 95, shooting: 60, passing: 74, dribbling: 82, defending: 76, physical: 72,
    playstyles: ['Rapid', 'Trickster'],
  },
  {
    id: 36, name: 'Manuel Neuer', overall: 86, position: 'GK',
    nationality: 'German', flag: '🇩🇪', club: 'Bayern Munich', league: 'Bundesliga',
    age: 38, height: 193, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 85, gkHandling: 87, gkKicking: 88, gkReflexes: 84, gkSpeed: 88, gkPositioning: 82,
    playstyles: ['Rush Out', 'Footwork'],
  },

  // ── Arsenal ───────────────────────────────────────────────────────────────
  {
    id: 37, name: 'Bukayo Saka', overall: 88, position: 'RW',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Arsenal', league: 'Premier League',
    age: 23, height: 178, preferredFoot: 'Left', weakFoot: 4, skillMoves: 4,
    pace: 86, shooting: 80, passing: 82, dribbling: 88, defending: 54, physical: 70,
    playstyles: ['Trickster', 'Finesse Shot', 'Dead Ball'],
  },
  {
    id: 38, name: 'Declan Rice', overall: 87, position: 'CDM',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Arsenal', league: 'Premier League',
    age: 26, height: 185, preferredFoot: 'Right', weakFoot: 3, skillMoves: 2,
    pace: 72, shooting: 68, passing: 80, dribbling: 77, defending: 85, physical: 84,
    playstyles: ['Intercept', 'Jockey', 'Block'],
  },
  {
    id: 39, name: 'Kai Havertz', overall: 84, position: 'ST',
    nationality: 'German', flag: '🇩🇪', club: 'Arsenal', league: 'Premier League',
    age: 25, height: 190, preferredFoot: 'Left', weakFoot: 4, skillMoves: 3,
    pace: 76, shooting: 78, passing: 78, dribbling: 80, defending: 60, physical: 78,
    playstyles: ['Power Header', 'Acrobatic'],
  },
  {
    id: 40, name: 'David Raya', overall: 85, position: 'GK',
    nationality: 'Spanish', flag: '🇪🇸', club: 'Arsenal', league: 'Premier League',
    age: 29, height: 183, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 84, gkHandling: 82, gkKicking: 84, gkReflexes: 84, gkSpeed: 84, gkPositioning: 82,
    playstyles: ['Footwork', 'Far Throw'],
  },
  {
    id: 41, name: 'Gabriel Magalhães', overall: 85, position: 'CB',
    nationality: 'Brazilian', flag: '🇧🇷', club: 'Arsenal', league: 'Premier League',
    age: 26, height: 190, preferredFoot: 'Left', weakFoot: 3, skillMoves: 1,
    pace: 76, shooting: 48, passing: 62, dribbling: 62, defending: 87, physical: 85,
    playstyles: ['Block', 'Bruiser', 'Power Header'],
  },

  // ── Inter Milan ───────────────────────────────────────────────────────────
  {
    id: 42, name: 'Marcus Thuram', overall: 86, position: 'ST',
    nationality: 'French', flag: '🇫🇷', club: 'Inter Milan', league: 'Serie A',
    age: 26, height: 192, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 90, shooting: 82, passing: 72, dribbling: 84, defending: 40, physical: 82,
    playstyles: ['Rapid', 'Bruiser', 'Power Header'],
  },
  {
    id: 43, name: 'Lautaro Martínez', overall: 85, position: 'ST',
    nationality: 'Argentinian', flag: '🇦🇷', club: 'Inter Milan', league: 'Serie A',
    age: 27, height: 174, preferredFoot: 'Right', weakFoot: 4, skillMoves: 4,
    pace: 78, shooting: 86, passing: 68, dribbling: 82, defending: 38, physical: 76,
    playstyles: ['Finesse Shot', 'Trickster'],
  },
  {
    id: 44, name: 'Hakan Çalhanoğlu', overall: 85, position: 'CDM',
    nationality: 'Turkish', flag: '🇹🇷', club: 'Inter Milan', league: 'Serie A',
    age: 30, height: 179, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 68, shooting: 76, passing: 86, dribbling: 80, defending: 76, physical: 72,
    playstyles: ['Dead Ball', 'Long Ball Pass', 'Power Shot'],
  },
  {
    id: 45, name: 'Nicolò Barella', overall: 85, position: 'CM',
    nationality: 'Italian', flag: '🇮🇹', club: 'Inter Milan', league: 'Serie A',
    age: 27, height: 172, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 76, shooting: 74, passing: 82, dribbling: 82, defending: 72, physical: 82,
    playstyles: ['Relentless', 'Press Proven'],
  },

  // ── AC Milan ──────────────────────────────────────────────────────────────
  {
    id: 46, name: 'Rafael Leão', overall: 86, position: 'LW',
    nationality: 'Portuguese', flag: '🇵🇹', club: 'AC Milan', league: 'Serie A',
    age: 25, height: 188, preferredFoot: 'Right', weakFoot: 3, skillMoves: 5,
    pace: 91, shooting: 80, passing: 78, dribbling: 90, defending: 28, physical: 76,
    playstyles: ['Rapid', 'Trickster'],
  },
  {
    id: 47, name: 'Theo Hernández', overall: 85, position: 'LB',
    nationality: 'French', flag: '🇫🇷', club: 'AC Milan', league: 'Serie A',
    age: 26, height: 184, preferredFoot: 'Left', weakFoot: 3, skillMoves: 3,
    pace: 92, shooting: 70, passing: 72, dribbling: 80, defending: 76, physical: 80,
    playstyles: ['Rapid', 'Power Shot'],
  },
  {
    id: 48, name: 'Mike Maignan', overall: 87, position: 'GK',
    nationality: 'French', flag: '🇫🇷', club: 'AC Milan', league: 'Serie A',
    age: 28, height: 191, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 86, gkHandling: 85, gkKicking: 80, gkReflexes: 89, gkSpeed: 85, gkPositioning: 83,
    playstyles: ['Rush Out', 'Far Reach'],
  },

  // ── Atletico Madrid ───────────────────────────────────────────────────────
  {
    id: 49, name: 'Antoine Griezmann', overall: 86, position: 'CAM',
    nationality: 'French', flag: '🇫🇷', club: 'Atletico Madrid', league: 'La Liga',
    age: 33, height: 176, preferredFoot: 'Left', weakFoot: 4, skillMoves: 4,
    pace: 76, shooting: 85, passing: 83, dribbling: 85, defending: 56, physical: 72,
    playstyles: ['Finesse Shot', 'Chip Shot', 'Trickster'],
  },
  {
    id: 50, name: 'Jan Oblak', overall: 87, position: 'GK',
    nationality: 'Slovenian', flag: '🇸🇮', club: 'Atletico Madrid', league: 'La Liga',
    age: 31, height: 188, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 89, gkHandling: 88, gkKicking: 72, gkReflexes: 90, gkSpeed: 88, gkPositioning: 84,
    playstyles: ['Far Reach', 'Rush Out'],
  },

  // ── Manchester United ─────────────────────────────────────────────────────
  {
    id: 51, name: 'Bruno Fernandes', overall: 85, position: 'CAM',
    nationality: 'Portuguese', flag: '🇵🇹', club: 'Manchester United', league: 'Premier League',
    age: 29, height: 179, preferredFoot: 'Right', weakFoot: 3, skillMoves: 4,
    pace: 74, shooting: 82, passing: 87, dribbling: 85, defending: 56, physical: 74,
    playstyles: ['Dead Ball', 'Through Pass', 'Finesse Shot'],
  },
  {
    id: 52, name: 'Marcus Rashford', overall: 83, position: 'LW',
    nationality: 'English', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Manchester United', league: 'Premier League',
    age: 27, height: 180, preferredFoot: 'Right', weakFoot: 3, skillMoves: 4,
    pace: 90, shooting: 78, passing: 72, dribbling: 84, defending: 32, physical: 74,
    playstyles: ['Rapid', 'Finesse Shot'],
  },

  // ── PSG ───────────────────────────────────────────────────────────────────
  {
    id: 53, name: 'Ousmane Dembélé', overall: 86, position: 'RW',
    nationality: 'French', flag: '🇫🇷', club: 'Paris Saint-Germain', league: 'Ligue 1',
    age: 27, height: 178, preferredFoot: 'Left', weakFoot: 4, skillMoves: 5,
    pace: 93, shooting: 79, passing: 76, dribbling: 88, defending: 36, physical: 70,
    playstyles: ['Rapid', 'Trickster', 'Finesse Shot'],
  },
  {
    id: 54, name: 'Achraf Hakimi', overall: 85, position: 'RB',
    nationality: 'Moroccan', flag: '🇲🇦', club: 'Paris Saint-Germain', league: 'Ligue 1',
    age: 26, height: 181, preferredFoot: 'Right', weakFoot: 3, skillMoves: 3,
    pace: 91, shooting: 68, passing: 76, dribbling: 80, defending: 78, physical: 76,
    playstyles: ['Rapid', 'Intercept'],
  },
  {
    id: 55, name: 'Gianluigi Donnarumma', overall: 87, position: 'GK',
    nationality: 'Italian', flag: '🇮🇹', club: 'Paris Saint-Germain', league: 'Ligue 1',
    age: 26, height: 196, preferredFoot: 'Right', weakFoot: 1, skillMoves: 1,
    pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0,
    gkDiving: 87, gkHandling: 84, gkKicking: 76, gkReflexes: 90, gkSpeed: 87, gkPositioning: 84,
    playstyles: ['Far Reach', 'Rush Out'],
  },
]

export const leagues = [...new Set(players.map(p => p.league))].sort()
export const clubs = [...new Set(players.map(p => p.club))].sort()
export const nationalities = [...new Set(players.map(p => p.nationality))].sort()
