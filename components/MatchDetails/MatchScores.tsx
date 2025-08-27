import { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import { BattingPlayer, ScoreData } from "@/pages/stats/[matchId]";

interface MatchScoresProps {
  data: ScoreData[]
}

const DEFAULT_VALUE = {
  BattingCard: [],
  BowlingCard: [],
  Extras: []
}

const MatchScores = ({ data }: MatchScoresProps) => {

  const [teams, setTeams] = useState<string[]>([])
  const [activeTeam, setActiveTeams] = useState<string>("")
  const [activeTeamScoreCard, setActiveTeamScoreCard] = useState<ScoreData>(DEFAULT_VALUE)

  const headers = [
    { key: "PlayerName", value: "Batsman" },
    { key: "Runs", value: "R" },
    { key: "Sixes", value: "6s" },
    { key: "Fours", value: "4s" },
    { key: "Balls", value: "B" },
  ];

  const data1 = [
    {
      player: "Virat",
      runs: 14,
      six: 10,
      four: 3,
      balls: 10,
    },
  ];

  const headers2 = [
    { key: "PlayerName", value: "Bolwer" },
    { key: "Runs", value: "R" },
    { key: "Wickets", value: "W" },
    { key: "Economy", value: "Eco" },
  ];

  const data2 = [
    {
      player: "Virat",
      over: 12,
      maiden: 14,
      dots: 10,
      economy: 4,
      wickets: 5,
    },
    {
      player: "Virat",
      over: 12,
      maiden: 14,
      dots: 10,
      economy: 4,
      wickets: 5,
    },
    {
      player: "Virat",
      over: 12,
      maiden: 14,
      dots: 10,
      economy: 4,
      wickets: 5,
    },
    {
      player: "Virat",
      over: 12,
      maiden: 14,
      dots: 10,
      economy: 4,
      wickets: 5,
    },
  ];


  console.log("this is the data", data)

  useEffect(() => {
    const team1 = data.length > 0 ? data[0].Extras[0].BattingTeamName : [];
    const team2 = data.length > 0 ? data[1].Extras[0].BattingTeamName : [];
    setTeams([team1 as string, team2 as string])
    setActiveTeams(team1 as string)

  }, [data])

  useEffect(() => {
    const activeTeamScoreCardValue = data.filter((item) => item.Extras[0].BattingTeamName === activeTeam)[0]
    setActiveTeamScoreCard(activeTeamScoreCardValue)
  }, [activeTeam])


  const handleChangeSelectedTeam = (team: string) => {
    setActiveTeams(team);
  }

  return (

    // Selection Tab
    <div className="flex flex-col gap-4 mx-8">
      <div className="flex justify-start gap-3">
        {
          teams.map((item, index) =>
          (
            <div
              className={`border-blue-400 border ${item === activeTeam && "bg-amber-400"} rounded-full px-2 py-1 cursor-pointer`}
              key={index}
              onClick={() => handleChangeSelectedTeam(item)}>
              {item}
            </div>
          ))
        }
      </div>


      <div className="">
        {/* {selectedTeam === "MI" && ( */}
        <div className="flex flex-col lg:flex-row gap-4">
          <TableComponent headers={headers} rows={activeTeamScoreCard?.BattingCard || []} />
          <TableComponent headers={headers2} rows={activeTeamScoreCard?.BowlingCard || []} />
        </div>
      </div>
    </div >
  );
};

export default MatchScores;
