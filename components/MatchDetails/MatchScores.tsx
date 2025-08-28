import { memo, useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import { BarChartData, PieChartData, ScoreData } from "../../utils/types/MatchStatsTypes";
import MatchBar from "./MatchBar";
import MatchPie from "./MatchPie";
import { batting_player_headers, bowling_player_headers } from "../../utils/constants/tableHeaders";

interface MatchScoresProps {
  data: ScoreData[];
}

const DEFAULT_VALUE = {
  BattingCard: [],
  BowlingCard: [],
  Extras: [],
};

const MatchScores = ({ data }: MatchScoresProps) => {
  //state for teams names render
  const [teams, setTeams] = useState<string[]>([]);
  //state for active team tab
  const [activeTeam, setActiveTeams] = useState<string>("");
  //state for active team tab data
  const [activeTeamScoreCard, setActiveTeamScoreCard] =
    useState<ScoreData>(DEFAULT_VALUE);
  //transformed data state for graph
  const [batsmenData, setBatsmenData] = useState<BarChartData[]>([]);
  const [bowlersData, setBowlersData] = useState<PieChartData[]>([]);

  useEffect(() => {
    const team1 = data.length > 0 ? data[0].Extras[0].BattingTeamName : [];
    const team2 = data.length > 0 ? data[1].Extras[0].BattingTeamName : [];
    setTeams([team1 as string, team2 as string]);
    setActiveTeams(team1 as string);
  }, [data]);

  //Side effect for Graph data transformation
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
  }, [activeTeam, data]);

  const handleChangeSelectedTeam = (team: string) => {
    setActiveTeams(team);
  };

  return (
    // Selection Tab
    <div className="flex flex-col gap-6 mb-8">
      {
        data.length > 0
        && <div className="flex justify-start gap-3">
          {teams.map((item, index) => (
            <div
              className={`border-blue-400 border ${item === activeTeam && "bg-primary text-white"
                } rounded-full px-3 py-1 cursor-pointer text-center`}
              key={index}
              onClick={() => handleChangeSelectedTeam(item)}
            >
              {item}
            </div>
          ))}
        </div>}


      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table for Batting Stats */}
        <TableComponent
          headers={batting_player_headers}
          rows={activeTeamScoreCard?.BattingCard || []}
        />
        {/* Table for Bowling Stats */}

        <TableComponent
          headers={bowling_player_headers}
          rows={activeTeamScoreCard?.BowlingCard || []}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-3 bg-white">
          <h2 className="border-b border-gray-400 p-3">Top 5 Batsmen</h2>
          <MatchBar data={batsmenData} tooltipContent="Runs Scored" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-3 bg-white">
          <h2 className="border-b border-gray-400 p-3">Top 5 Bowlers</h2>
          <MatchPie data={bowlersData && bowlersData.map((item) => ({ ...item, name: item.name.split(" ")[0] }))} />
        </div>
      </div>
    </div>
  );
};

export default memo(MatchScores);
