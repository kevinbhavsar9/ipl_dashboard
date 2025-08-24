import React from "react";
import TableComponent from "../shared/TableComponent";

interface ScheduleComponentProps {
  // className?: string;
}

//headers
// Match, date, venue,

export const ScheduleComponent: React.FC<ScheduleComponentProps> = () => {
  const table_headers = [
    { key: "match", value: "Match" },
    { key: "date", value: "Date" },
    { key: "venue", value: "Venue" },
  ];

  const table_rows = [
    {
      match: "CSK vs MI",
      date: "2024-04-10",
      venue: "Chennai",
    },
    {
      match: "RCB vs KKR",
      date: "2024-04-11",
      venue: "Bangalore",
    },
    {
      match: "SRH vs DC",
      date: "2024-04-12",
      venue: "Hyderabad",
    },
  ];
  return (
    <div className="border border-gray-300 rounded bg-white ml-1 w-full">
      <h1 className="mx-4 my-2 font-bold">Schedule</h1>
      <div className="mx-2 max-w-[90vw]">
        <TableComponent headers={table_headers} rows={table_rows} />
      </div>
    </div>
  );
};
