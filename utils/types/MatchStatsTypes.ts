export interface BattingPlayer {
  PlayerID: string;
  PlayerName: string;
  Runs: number
  Sixes: number
  Fours: number
  Balls: number
}

export interface BowlingPlayer {
  PlayerID: string;
  PlayerName: string;
  Runs: number
  Wickets: number
  Economy: number
}

export type Extras = {
  BattingTeamName: string;
  BowlingTeamName: string;
  Total: string;
}

export interface ScoreData {
  BattingCard: BattingPlayer[];
  BowlingCard: BowlingPlayer[];
  Extras: Extras[];
}

export interface BallData {
  BallID: string;
  BallName: string;
  TotalRuns: string;
  OverNo: number;
  TeamName: string
}



export interface BarChartData {
  label: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
}
