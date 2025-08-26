import { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import { ScoreData } from "@/pages/stats/[matchId]";

interface MatchScoresProps {
  data: ScoreData[]
}

const MatchScores = ({ data }: MatchScoresProps) => {

  const [teams, setTeams] = useState<string[]>([])
  const [activeTeam, setActiveTeams] = useState<string>(teams.length > 0 ? teams[0] : "")

  const headers = [
    { key: "player", value: "Batsman" },
    { key: "runs", value: "R" },
    { key: "six", value: "6s" },
    { key: "four", value: "4s" },
    { key: "balls", value: "B" },
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
    { key: "player", value: "Bolwer" },
    { key: "over", value: "O" },
    { key: "maiden", value: "M" },
    { key: "dots", value: "Dots" },
    { key: "wickets", value: "W" },
    { key: "economy", value: "Eco" },
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
  }, [data])



  const [selectedTeam, setSelectedTeam] = useState("MI");
  return (

    // Selection Tab
    <div className="flex flex-col gap-4 mx-8">
      <div className="flex justify-start gap-3">

        {
          teams.map((item) =>
          (
            <div className="border-blue-400 border rounded-full px-2 py-1 cursor-pointer"
              onClick={() => setSelectedTeam("MI")} key={item}>
              {item}
            </div>))

        }
      </div>


      <div className="">
        {/* {selectedTeam === "MI" && ( */}
        <div className="flex flex-col lg:flex-row gap-4">
          <TableComponent headers={headers} rows={data1} />
          <TableComponent headers={headers2} rows={data2} />
        </div>
      </div>
    </div >
  );
};

export default MatchScores;
