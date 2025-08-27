import { Match } from "@/pages/api/schedule";
import { useRouter } from "next/navigation";
import { toTitleCase, formatToIST } from "../../utils/lib/helper";
import { useEffect, useState } from "react";

interface MatchCardProps {
  matchDetails: Match
}

interface LiveScore {
  team: string;
  innings: number;
  over: number;
  ball: number;
  score: number;
  wickets: number;
}



export default function MatchCard({ matchDetails }: MatchCardProps) {
  const router = useRouter();
  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (matchDetails.status.toLowerCase() === "live") {
      // Start polling
      const fetchScore = async () => {
        try {
          const res = await fetch("/api/realtimescore");
          if (!res.ok) throw new Error("Failed to fetch score");
          const data: LiveScore = await res.json();
          setLiveScore(data);
        } catch (err) {
          console.error("Error fetching score:", err);
        }
      };

      fetchScore(); // fetch immediately
      interval = setInterval(fetchScore, 5000); // fetch every 5s
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [matchDetails.status]);



  return (
    <div
      className="min-w-[320px] rounded-xl shadow-md border border-gray-200 mx-2 cursor-pointer"
      onClick={() => router.push("/stats")}
    >
      {/* Top Bar */}
      <div className="bg-blue-100 px-3 py-1 text-xs font-semibold flex justify-between">
        <span className={`${matchDetails.status.toLowerCase() === "live" ? "text-orange-600" : "text-green-800"}`}>{toTitleCase(matchDetails.status)}</span>
        <span className="text-gray-600">
          {matchDetails.venue.split(",")[1]}
        </span>
      </div>

      {/* Match Content */}
      <div className="p-4 space-y-3">
        {/* Teams */}
        <div className="space-y-2">
          {/* Team 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {matchDetails.status === "upcoming" ? <span className="font-semibold">{matchDetails.homeTeam.name}</span> : <>
                <span className="font-semibold">{matchDetails.homeTeam.code}</span>
                {
                  liveScore?.innings === 1 && <span className="text-red-500 text-md animate-pulse-red" >●</span>
                }
              </>}


            </div>
            {
              matchDetails.status === "live" && liveScore?.innings === 1 && <div className="text-sm text-gray-700">
                <span className="text-xs">({liveScore.over}.{liveScore.ball})</span>{" "}
                <span className="font-bold">{liveScore.score}/{liveScore.wickets}</span>
              </div>

            }

          </div>

          {/* Team 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {matchDetails.status === "upcoming" ? <span className="font-semibold">{matchDetails.awayTeam.name}</span> : <>
                <span className="font-semibold">{matchDetails.awayTeam.code}</span>
                {
                  liveScore?.innings === 2 && <span className="text-red-500 text-md animate-pulse-red">●</span>
                }
              </>}  
            </div>
            {
              matchDetails.status === "live" && liveScore?.innings === 2 ? <div className="text-sm text-gray-700">
                <span className="text-xs">({liveScore.over || 0.0})</span>{" "}
                <span className="font-bold">{liveScore.score ? liveScore.score : 0} /{liveScore.wickets || 0}</span>
              </div> : <div className="text-sm text-gray-700">
                <span className="text-xs">({0.0})</span>{" "}
                <span className="font-bold">{0}/{0}</span>
              </div>

            }

          </div>
        </div>

        {/* Match Status */}
        <p className="text-xs text-gray-600">
          {
            `${formatToIST(matchDetails.dateTime)} at ${matchDetails.venue}`}
        </p>
      </div>
    </div>
  );
}
