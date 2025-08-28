export interface PointsTableRow {
  rank: string;
  team: string;
  played: string;
  won: string;
  lost: string;
  noResult: string;
  nrr: string;
  runsFor: string;
  runsAgainst: string;
  points: string;
  recentForm: string;
  [key: string]: string | number;
}

export interface PointsTableResponse {
  source: string;
  table?: PointsTableRow[];
  error?: string;
}