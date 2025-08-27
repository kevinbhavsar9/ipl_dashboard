import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Match, MatchLinks, Team } from "@/pages/api/schedule";
import Link from "next/link";
import { BattingPlayer, BowlingPlayer } from "@/pages/stats/[matchId]";


type TableHeader = {
  key: string;
  value: string;
};

interface TableComponentPros {
  headers: TableHeader[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any;
  // rows: MatchLinks[] | Team[] | null | number[] | undefined | BattingPlayer[] | BowlingPlayer[] | string[];
}

const TableComponent: React.FC<TableComponentPros> = ({ headers, rows }) => {
  console.log(rows);
  return (
    <TableContainer
      component={Paper}
      className="overflow-x-auto scroll scroll-m-4 scroll-bar"
    >
      <Table
        sx={{ minWidth: 200, width: "100%", overflowX: "auto" }}
        aria-label="simple table"
      >
        <TableHead className="bg-blue-100">
          <TableRow>
            {headers.map((item) => (
              <TableCell key={item.key}>{item.value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

          {
            // @ts-expect-error will fix later
            rows?.map((row, row_id) => (
              <TableRow
                key={row_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {headers.map((header) => {
                  return header.key === "match" ? <TableCell key={header.key} component="th" scope="row">
                    <Link href={`/stats/${"matchId" in row ? row.matchId : ""}`}>
                      {row[header.key]}
                    </Link>
                  </TableCell> :
                    <TableCell key={header.key} component="th" scope="row">
                      {row[header.key] as string}
                    </TableCell>
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
