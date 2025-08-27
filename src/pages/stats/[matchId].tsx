import { useEffect, useState } from "react";
import DetailsTile from "../../../components/MatchDetails/DetailsTile";
import MatchGraph from "../../../components/MatchDetails/MatchGraph";
import MatchScores from "../../../components/MatchDetails/MatchScores";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

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

interface BallData {
  BallID: string;
  BallName: string;
  TotalRuns: string;
  OverNo: number;
  TeamName: string
}

const Page = () => {

  const [scoreData, setScoreData] = useState<ScoreData[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [graphData, setGraphData] = useState<any[]>([]);


  const router = useRouter();
  const { matchId } = router.query;

  useEffect(() => {

    const fetchScoreCardData = async () => {
      try {
        if (matchId) {

          const response = await axios.get(`/api/scorecard/${matchId}`);

          console.log("score table", response.data)

          const match_data = response.data.data
          console.log(match_data)
          setScoreData(match_data)
          setGraphData([response.data.data[0], response.data.data[1]])
        }

      } catch (error) {
        toast.error("Error in fetching data")
        console.error(error)
      }
    };

    fetchScoreCardData()
  }, [matchId])


  return (
    <div className="flex flex-col gap-4 w-full">
      <DetailsTile data={scoreData.length > 0 ? scoreData.map((item) => item.Extras) : []} />
      <MatchScores data={scoreData.length > 0 ? scoreData : []} />
      {/* <MatchGraph /> */}
    </div>
  );
};

export default Page;
