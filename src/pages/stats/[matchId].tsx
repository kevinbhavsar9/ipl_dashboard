import { useCallback, useEffect, useState } from "react";
import DetailsTile from "../../../components/MatchDetails/DetailsTile";
import MatchScores from "../../../components/MatchDetails/MatchScores";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ScoreData } from "../../../utils/types/MatchStatsTypes";



const StatsPage = () => {

  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  const router = useRouter();
  const { matchID } = router.query;

  useEffect(() => {
    console.log("router", router)
    console.log("matchID", matchID)

  }, [router.query, router, matchID])



  useEffect(() => {
    if (!router.isReady || !matchID) return;

    const fetchScoreCardData = async (id: string) => {
      try {

        const response = await axios.get(`/api/scorecard/${id}`);
        const match_data = response.data.data
        setScoreData(match_data)


      } catch (error) {
        console.log(error)
        toast.error("Please try again!")
      }
    };

    const id = Array.isArray(matchID) ? matchID[0] : matchID;
    fetchScoreCardData(id);
  }, [router.query, router.isReady, matchID]);


  return (
    <div className="flex flex-col gap-4 w-full">
      <DetailsTile data={scoreData.length > 0 ? scoreData.map((item) => item.Extras) : []} />
      <MatchScores data={scoreData.length > 0 ? scoreData : []} />
    </div>
  );
};

export default StatsPage;
