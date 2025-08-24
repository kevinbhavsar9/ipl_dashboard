import { useState } from "react";
import TableComponent from "../shared/TableComponent";

const MatchScores = () => {
  const headers = [
    { key: "player", value: "Player" },
    { key: "status", value: "" },
    { key: "runs", value: "R" },
    { key: "balls", value: "B" },
  ];

  const data = [
    {
      player: "Virat",
      status: "Bowled BY ABC",
      runs: 14,
      balls: 10,
    },
    {
      player: "Rohit",
      status: "Caught by A Bowling B",
      runs: 14,
      balls: 10,
    },
    {
      player: "Sachin",
      status: "Caught by B Bowling C",
      runs: 14,
      balls: 10,
    },
    {
      player: "AB",
      status: "Not Out",
      runs: 14,
      balls: 10,
    },
  ];

  const headers2 = [
    { key: "player", value: "Player" },
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
