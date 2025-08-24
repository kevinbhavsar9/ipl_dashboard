import React from "react";
import TableComponent from "../shared/TableComponent";

interface PointComponentProps {
  // className?: string;
}

// Pos, Team, Played, win, loss, NRR, Points

export const PointsComponent: React.FC<PointComponentProps> = () => {
  const table_headers = [
    { key: "pos", value: "POS" },
    { key: "team_name", value: "Name" },
    { key: "total_played", value: "P" },
    { key: "win", value: "W" },
    { key: "loss", value: "L" },
    { key: "nrr", value: "NRR" },
    { key: "pts", value: "PTS" },
  ];

  const rows = [
    {
      pos: 1,
      team_name: "Chennai Super Kings",
      total_played: 14,
      win: 10,
      loss: 4,
      nrr: "+0.809",
      pts: 20,
    },
    {
      pos: 2,
      team_name: "Mumbai Indians",
      total_played: 14,
      win: 9,
      loss: 5,
      nrr: "+0.421",
      pts: 18,
    },
    {
      pos: 3,
      team_name: "Royal Challengers Bangalore",
      total_played: 14,
      win: 8,
      loss: 6,
      nrr: "+0.134",
      pts: 16,
    },
    {
      pos: 4,
      team_name: "Kolkata Knight Riders",
      total_played: 14,
      win: 7,
      loss: 7,
      nrr: "-0.214",
      pts: 14,
    },
    // Add more teams as needed
  ];

  return (
    <div className="border border-gray-300 rounded bg-white mr-1 w-full">
      <h1 className="mx-4 my-2 font-bold">Point Table</h1>
      <div className="mx-2 max-w-[90vw]">
        <TableComponent headers={table_headers} rows={rows} />
      </div>
    </div>
  );
};
