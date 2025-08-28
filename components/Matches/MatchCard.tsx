'use client'
import { toTitleCase, formatToIST } from "../../utils/lib/helper";
import { useEffect, useState } from "react";
import { LiveScore, MatchCardProps } from "../../utils/types/MatchCardTypes";
import { toast } from "react-toastify";


export default function MatchCard({ matchDetails }: MatchCardProps) {

  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);
  const [prevWicket, setPrevWicket] = useState<number | undefined>(0);
  const [firstInningsScore, setFirstInningsScore] = useState<LiveScore>({
    team: "",
    innings: 1,
    over: 0,
    ball: 0,
    score: 0,
    wickets: 0
  })

  const { status, venue, homeTeam, dateTime } = matchDetails

  //Live Score Polling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status.toLowerCase() === "live") {

      // Start polling
      const fetchScore = async () => {
        try {
          const res = await fetch("/api/realtimescore");
          if (!res.ok) throw new Error("Failed to fetch score");
          const data: LiveScore = await res.json();

          setLiveScore((prevState) => {
            setPrevWicket(prevState?.wickets);
            return data;
          });

          //set score to session storage
          if (data.innings === 1) {
            sessionStorage.setItem("firstInnings", JSON.stringify(data))
          }
          else {
            sessionStorage.setItem("secondInnings", JSON.stringify(data))
          }

        } catch (err) {
          console.log("error fetching match card data", err);
          toast.error("Please try again")
        }
      };

      // fetch immediately
      fetchScore();
      interval = setInterval(fetchScore, 5000); // fetch every 5s
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [matchDetails, status]);

  //Side Effect for Notification
  useEffect(() => {
    if (prevWicket && (prevWicket !== liveScore?.wickets)) {
      toast.info("Another wicket bites the dust!");
      setPrevWicket(liveScore?.wickets)
    }
  }, [prevWicket, liveScore])


  //storing the innings data in session storage for persistance
  useEffect(() => {
    const tempFirstInningsScore: LiveScore = JSON.parse(sessionStorage.getItem("firstInnings") as string)
    setFirstInningsScore(tempFirstInningsScore)
  }, [])


  return (
    <div
      className="min-w-[320px] rounded-xl shadow-md border border-gray-200 mx-2 cursor-pointer">

      {/* Top Bar */}
      <div className="bg-blue-100 px-3 py-1 text-xs font-semibold flex justify-between">
        <span className={`${status.toLowerCase() === "live" ? "text-orange-600" : "text-green-800"}`}>{toTitleCase(status)}</span>
        <span className="text-gray-600">
          {venue.split(",")[1]}
        </span>
      </div>

      {/* Match Content */}
      <div className="p-4 space-y-3">
        {/* Teams Container*/}
        <div className="space-y-2">
          {/* Team 1 */}
          <div className="flex justify-between items-center">

            {/* Team Name Block */}
            <div className="flex items-center space-x-2">
              {status === "upcoming" ? <span className="font-semibold">{homeTeam.name}</span> : <>
                <span className="font-semibold">{homeTeam.code}</span>
                {
                  liveScore?.innings === 1 && <span className="text-red-500 text-md animate-pulse-red" >●</span>
                }
              </>}
            </div>

            {/* Team 1 Score Card Block */}
            {status === "live" && (liveScore?.innings === 1 ?
              (<div className="text-sm text-gray-700">
                <span className="text-xs">({liveScore.over}.{liveScore.ball})</span>{" "}
                <span className="font-bold">{liveScore.score}/{liveScore.wickets}</span>
              </div>) :
              (<div className="text-sm text-gray-700">
                {firstInningsScore && (<><span className="text-xs">({firstInningsScore.score}.{firstInningsScore.ball})</span>{" "}
                  <span className="font-bold">{firstInningsScore.score}/{firstInningsScore.wickets}</span></>)}

              </div>))
            }

          </div>

          {/* Team 2 */}
          <div className="flex justify-between items-center">

            {/* Team Name Block */}
            <div className="flex items-center space-x-2">
              {matchDetails.status === "upcoming" ? <span className="font-semibold">{matchDetails.awayTeam.name}</span> : <>
                <span className="font-semibold">{matchDetails.awayTeam.code}</span>
                {
                  liveScore?.innings === 2 && <span className="text-red-500 text-md animate-pulse-red">●</span>
                }
              </>}
            </div>

            {/*Team2 Score Card Block */}
            {
              matchDetails.status === "live" && (liveScore?.innings === 2 ?
                (<div className="text-sm text-gray-700">
                  <span className="text-xs">({liveScore.over || 0.0})</span>{" "}
                  <span className="font-bold">{liveScore.score ? liveScore.score : 0} /{liveScore.wickets || 0}</span>
                </div>) :
                (<div className="text-sm text-gray-700">
                  <span className="text-xs">({0.0})</span>{" "}
                  <span className="font-bold">{0}/{0}</span>
                </div>))

            }

          </div>
        </div>

        {/* Match Status */}
        <p className="text-xs text-gray-600">
          {
            `${formatToIST(dateTime)} at ${venue}`}
        </p>
      </div>
    </div>
  );
}
