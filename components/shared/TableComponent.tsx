import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { memo, useState } from "react";
import PaginationItem from "@mui/material/PaginationItem";
import { getPaginationLabel } from "../../utils/lib/helper";
import { ROWS_PER_PAGE } from "../../utils/config";

type TableHeader = {
  key: string;
  value: string;
};

interface TableComponentPros {
  headers: TableHeader[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any;
  loading?: boolean;
}



const TableComponent: React.FC<TableComponentPros> = ({
  headers,
  rows,
  loading,
}) => {
  const [page, setPage] = useState(0);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => setPage(value - 1);

  const slicedData = rows?.slice(
    ROWS_PER_PAGE * page,
    ROWS_PER_PAGE * (page + 1)
  );

  return loading ? (
    <div className="flex justify-center items-center h-[200px] w-full">
      <CircularProgress />
    </div>
  ) : (
    <div className="flex flex-col w-full">
      <TableContainer
        component={Paper}
        className="overflow-x-auto scroll scroll-m-4 scroll-bar h-[40vh]"
      >
        <Table
          sx={{ minWidth: 200, width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead className="bg-blue-100 sticky top-0">
            <TableRow>
              {headers.map((item) => (
                <TableCell key={item.key}>{item.value}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData?.map(
              (
                row: { [x: string]: string },
                row_id: React.Key | null | undefined
              ) => (
                <TableRow
                  key={row_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {headers.map((header) => {
                    return header.key === "match" ? (
                      <TableCell
                        key={header.key}
                        component="th"
                        scope="row"
                        sx={{ width: "20%" }}

                      >
                        <Link href={`/stats/${row["matchID"]}`} className="hover:border-b-2 hover:border-blue-100">
                          {row[header.key] as string}
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell key={header.key} component="th" scope="row">
                        {row[header.key] as string}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>


      <div className="flex items-center justify-between border-t border-[#E9E9E9] py-3 px-4 bg-white">
        <div className="text-xs text-[#6F6F6F]">
          {getPaginationLabel(rows, page, ROWS_PER_PAGE)}
        </div>
        <Pagination
          size="small"
          count={Math.ceil(rows.length / ROWS_PER_PAGE)}
          page={page + 1}
          onChange={handlePageChange}
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#4D4D4D",
              "&.Mui-selected": {
                backgroundColor: "#dbeafe",
                border: "none",
              },
            },
          }}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              
            />
          )}
        />
      </div>
    </div>
  );
};

export default memo(TableComponent);
