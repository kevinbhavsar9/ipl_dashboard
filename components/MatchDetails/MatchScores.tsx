import { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import { ScoreData } from "@/pages/stats/[matchId]";
import MatchGraph from "./MatchGraph";
import MatchPie from "./MatchPie";

interface MatchScoresProps {
  data: ScoreData[];
}

export interface BarChartData {
  label: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
}

const DEFAULT_VALUE = {
  BattingCard: [],
  BowlingCard: [],
  Extras: [],
};

const MatchScores = ({ data }: MatchScoresProps) => {
  const [teams, setTeams] = useState<string[]>([]);
  const [activeTeam, setActiveTeams] = useState<string>("");
  const [activeTeamScoreCard, setActiveTeamScoreCard] =
    useState<ScoreData>(DEFAULT_VALUE);
  const [batsmenData, setBatsmenData] = useState<BarChartData[]>([]);
  const [bowlersData, setBowlersData] = useState<PieChartData[]>([]);

  console.log(activeTeamScoreCard, "Car", batsmenData);

  const headers = [
    { key: "PlayerName", value: "Batsman" },
    { key: "Runs", value: "R" },
    { key: "Sixes", value: "6s" },
    { key: "Fours", value: "4s" },
    { key: "Balls", value: "B" },
  ];

  const headers2 = [
    { key: "PlayerName", value: "Bolwer" },
    { key: "Runs", value: "R" },
    { key: "Wickets", value: "W" },
    { key: "Economy", value: "Eco" },
  ];

  console.log("this is the data", data);

  useEffect(() => {
    const team1 = data.length > 0 ? data[0].Extras[0].BattingTeamName : [];
    const team2 = data.length > 0 ? data[1].Extras[0].BattingTeamName : [];
    setTeams([team1 as string, team2 as string]);
    setActiveTeams(team1 as string);
  }, [data]);

  useEffect(() => {
    const activeTeamScoreCardValue = data.filter(
      (item) => item.Extras[0].BattingTeamName === activeTeam
    )[0];
    const topBatsmenData = activeTeamScoreCardValue?.BattingCard.sort(
      (a, b) => b.Runs - a.Runs
    ).slice(0, 5);
    const transformedBatsmanData = topBatsmenData?.map((item) => ({
      label: item.PlayerName,
      value: item.Runs,
    }));
    const topBowlersData = activeTeamScoreCardValue?.BowlingCard.sort(
      (a, b) => b.Wickets - a.Wickets
    ).slice(0, 5);
    const transformedBowlerData = topBowlersData?.map((item) => ({
      name: item.PlayerName,
      value: item.Wickets,
    }));

    setActiveTeamScoreCard(activeTeamScoreCardValue);
    setBatsmenData(transformedBatsmanData);
    setBowlersData(transformedBowlerData);
  }, [activeTeam]);

  const handleChangeSelectedTeam = (team: string) => {
    setActiveTeams(team);
  };

  return (
    // Selection Tab
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex justify-start gap-3">
        {teams.map((item, index) => (
          <div
            className={`border-blue-400 border ${
              item === activeTeam && "bg-blue-400"
            } rounded-full px-3 py-1 cursor-pointer`}
            key={index}
            onClick={() => handleChangeSelectedTeam(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <TableComponent
          headers={headers}
          rows={activeTeamScoreCard?.BattingCard || []}
        />
        <TableComponent
          headers={headers2}
          rows={activeTeamScoreCard?.BowlingCard || []}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-3 bg-white">
          <div className="border-b border-gray-400 p-3">Top 5 Batsmen</div>
          <MatchGraph data={batsmenData} tooltipContent="Runs Scored" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-3 bg-white">
          <div className="border-b border-gray-400 p-3">Top 5 Bowlers</div>
          <MatchPie data={bowlersData} />
        </div>
      </div>
    </div>
  );
};

export default MatchScores;
