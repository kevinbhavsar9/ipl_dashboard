import React, { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import axios from "axios";
import { Match } from "@/pages/api/schedule";


type ScheduleComponentProps = object

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

    const [scheduleTable, setScheduleTable] = useState<Match[]>([])

    useEffect(() => {

        const fetchScheduleTable = async () => {
            try {
                const response = await axios.get("/api/schedule");
                console.log("shcedule table", response.data)
                setScheduleTable(response.data.matches.map((item: Match) => {
                    return {
                        match: `${item.homeTeam.code} vs ${item.awayTeam.code}`,
                        date: item.dateTime,
                        venue: item.venue,
                    }
                }));
            } catch (error) {
                console.error("Error fetching points table:", error);
            }
        };

        fetchScheduleTable()
    }, [])

    return (
        <div className="border border-gray-300 rounded bg-white ml-1 w-full">
            <h1 className="mx-4 my-2 font-bold">Schedule</h1>
            <div className="mx-2 max-w-[90vw]">
                <TableComponent headers={table_headers} rows={scheduleTable} />
            </div>
        </div>
    );
};
