import { useEffect, useState } from "react";
import DetailsTile from "../../../components/MatchDetails/DetailsTile";
import MatchGraph from "../../../components/MatchDetails/MatchGraph";
import MatchScores from "../../../components/MatchDetails/MatchScores";
import { useRouter } from "next/router";
import axios from "axios";

const Page = () => {

  const [scoreData, setScoreData] = useState([])

  const router = useRouter();
  const { matchId } = router.query;

  useEffect(() => {

    const fetchScoreCardData = async () => {
      try {
        if (matchId) {

          const response = await axios.get(`/api/scorecard/${matchId}`);
          console.log("score table", response.data)
        }
        // setPointTable(response.data.table.map((item: PointsTableRow) => {
        //   return {
        //     pos: item.rank,
        //     team_name: item.team,
        //     total_played: item.played,
        //     win: item.won,
        //     loss: item.lost,
        //     nrr: item.nrr,
        //     pts: item.points
        //   }
        // }));
      } catch (error) {
        console.error("Error fetching score table:", error);
      }
    };

    fetchScoreCardData()
  }, [matchId])


  return (
    <div className="flex flex-col gap-4 w-full">
      <DetailsTile />
      <MatchScores />
      <MatchGraph />
    </div>
  );
};

export default Page;
