import React, { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import axios from "axios";
import { Match } from "../../utils/types/MatchScheduleTypes";
import { toast } from "react-toastify";
import { scheduleTableHeaders } from "../../utils/constants/tableHeaders";

//Component to Show IPL schedule
export const ScheduleComponent = () => {

  const [scheduleTable, setScheduleTable] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScheduleTable = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/schedule");
        if (response.status !== 200) {
          toast.error("Please try again");
        }
        setScheduleTable(
          response.data.matches.map((item: Match) => {
            return {
              matchID: item.matchID,
              match: `${item.homeTeam.code} vs ${item.awayTeam.code}`,
              date: item.dateTime,
              venue: item.venue,
            };
          })
        );
      } catch (error) {
        console.log("Error fetching schedule table:", error);
        toast.error("Please try again")
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleTable();
  }, []);

  return (
    <div className="border border-gray-300 rounded bg-white ml-1 w-full">
      <h1 className="mx-4 my-2 font-bold">Schedule</h1>
      <div className="mx-2 max-w-[90vw]">
        <TableComponent
          headers={scheduleTableHeaders}
          rows={scheduleTable}
          loading={loading}
        />
      </div>
    </div>
  );
};
