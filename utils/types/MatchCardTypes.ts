import { Match } from "./MatchScheduleTypes";

export interface MatchCardProps {
  matchDetails: Match
}

export interface LiveScore {
  team: string;
  innings: number;
  over: number;
  ball: number;
  score: number;
  wickets: number;
}



export type MatchState = {
  innings: number; // 1 or 2
  over: number;
  ball: number;
  score: number;
  wickets: number;
  team: string;
};
