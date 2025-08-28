// File: src/pages/api/live-score.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MatchState } from "../../../utils/types/MatchCardTypes";


const DEFAULT_MATCH_STATE={
  innings: 1,
  over: 0,
  ball: 0,
  score: 0,
  wickets: 0,
  team: "Gujarat Titans",
}

let matchState: MatchState =DEFAULT_MATCH_STATE ;

// Reset match
function resetMatch() {
  matchState = {
    innings: 1,
    over: 0,
    ball: 0,
    score: 0,
    wickets: 0,
    team: "Gujarat Titans",
  };
}

// Simulate a ball
function simulateBall() {
  // Random outcome: 0,1,2,3,4,6 or wicket (-1)
  const outcomes = [0, 1, 2, 3, 4, 6, -1];
  const result = outcomes[Math.floor(Math.random() * outcomes.length)];
  // const result = -1;

  if (result === -1) {
    matchState.wickets += 1;
  } else {
    matchState.score += result;
  }

  // Update ball/over
  matchState.ball += 1;
  if (matchState.ball === 6) {
    matchState.ball = 0;
    matchState.over += 1;
  }

  // If innings ends
  if (matchState.over === 20 || matchState.wickets === 10) {
    if (matchState.innings === 1) {
      // Start 2nd innings
      matchState = {
        innings: 2,
        over: 0,
        ball: 0,
        score: 0,
        wickets: 0,
        team: "Mumbai Indians",
      };
    } else {
      // Match over → reset
      resetMatch();
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  simulateBall();

  res.status(200).json({
    team: matchState.team,
    innings: matchState.innings,
    over: matchState.over,
    ball: matchState.ball,
    score: matchState.score,
    wickets: matchState.wickets,
  });
}
