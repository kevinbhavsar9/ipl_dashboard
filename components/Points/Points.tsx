import React, { useEffect, useState, useCallback, memo } from "react";
import TableComponent from "../shared/TableComponent";
import { PointsTableRow } from "../../utils/types/PointTableTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { pointTablHeaders } from "../../utils/constants/tableHeaders";


const PointsComponent = () => {
  const [pointTable, setPointTable] = useState<PointsTableRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPointsTable = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/points");
      if (response.status !== 200) {
        toast.error("Please try again!");
      }
      setPointTable(
        response.data.table.map((item: PointsTableRow) => {
          return {
            pos: item.rank,
            team_name: item.team,
            total_played: item.played,
            win: item.won,
            loss: item.lost,
            nrr: item.nrr,
            pts: item.points,
          };
        })
      );
    } catch (error) {
      console.log("Error fetching points table:", error);
      toast.error("Please try again")
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPointsTable();
  }, [fetchPointsTable]);



  return (
    <div className="border border-gray-300 rounded bg-white mr-1 w-full">
      <h1 className="mx-4 my-2 font-bold">Point Table</h1>
      <div className="mx-2 max-w-[90vw]">
        <TableComponent
          headers={pointTablHeaders}
          rows={pointTable}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default memo(PointsComponent)
