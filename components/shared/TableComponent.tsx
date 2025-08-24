import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type TableHeader = {
  key: string;
  value: string;
};

interface TableComponentPros {
  headers: TableHeader[];
  rows: Array<{ [key: string]: string | number }>;
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
          {rows.map((row, row_id) => (
            <TableRow
              key={row_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell key={header.key} component="th" scope="row">
                  {row[header.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
