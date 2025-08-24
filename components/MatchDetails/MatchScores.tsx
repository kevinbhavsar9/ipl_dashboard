import { useState } from "react";
import TableComponent from "../shared/TableComponent";

const MatchScores = () => {
  const headers = [
    { key: "player", value: "Batsman" },
    { key: "runs", value: "R" },
    { key: "six", value: "6s" },
    { key: "four", value: "4s" },
    { key: "balls", value: "B" },
  ];

  const data = [
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

  const [selectedTeam, setSelectedTeam] = useState("MI");
  return (
    <div className="flex flex-col gap-4 mx-8">
      <div className="flex justify-start gap-3">
        <div
          className="border-blue-400 border rounded-full px-2 py-1 cursor-pointer"
          onClick={() => setSelectedTeam("MI")}
        >
          Mumbai Indians
        </div>
        <div
          className="border-red-400 border rounded-full px-2 py-1 cursor-pointer"
          onClick={() => setSelectedTeam("CSK")}
        >
          Chennai Super Kings
        </div>
      </div>
      <div className="">
        {/* {selectedTeam === "MI" && ( */}
        <div className="flex flex-col lg:flex-row gap-4">
          <TableComponent headers={headers} rows={data} />
          <TableComponent headers={headers2} rows={data2} />
        </div>
      </div>
    </div>
  );
};

export default MatchScores;
