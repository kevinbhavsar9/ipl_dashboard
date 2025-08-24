import React, { useEffect, useState } from "react";
import TableComponent from "../shared/TableComponent";
import { PointsTableRow } from "@/pages/api/points";
import axios from "axios";

type PointComponentProps = object;

// Pos, Team, Played, win, loss, NRR, Points

export const PointsComponent: React.FC<PointComponentProps> = () => {
    const [pointTable, setPointTable] = useState<PointsTableRow[]>([])

    useEffect(() => {

        const fetchPointsTable = async () => {
            try {
                const response = await axios.get("/api/points");
                console.log("points table", response.data)
                setPointTable(response.data.table.map((item: PointsTableRow) => {
                    return {
                        pos: item.rank,
                        team_name: item.team,
                        total_played: item.played,
                        win: item.won,
                        loss: item.lost,
                        nrr: item.nrr,
                        pts: item.points
                    }
                }));
            } catch (error) {
                console.error("Error fetching points table:", error);
            }
        };

        fetchPointsTable()
    }, [])


    const table_headers = [
        { key: "pos", value: "POS" },
        { key: "team_name", value: "Name" },
        { key: "total_played", value: "P" },
        { key: "win", value: "W" },
        { key: "loss", value: "L" },
        { key: "nrr", value: "NRR" },
        { key: "pts", value: "PTS" },
    ];


    return (
        <div className="border border-gray-300 rounded bg-white mr-1 w-full">
            <h1 className="mx-4 my-2 font-bold">Point Table</h1>
            <div className="mx-2 max-w-[90vw]">
                <TableComponent headers={table_headers} rows={pointTable} />
            </div>
        </div>
    );
};
