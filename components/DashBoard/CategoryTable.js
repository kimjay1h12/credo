import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography, ButtonBase } from "@mui/material";
import { useRouter } from "next/router";
import RemoveIcon from "@mui/icons-material/Remove";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    label: "test1",
    quantity: 5,
  },
  {
    label: "test1",
    quantity: 5,
  },
  {
    label: "test1",
    quantity: 5,
  },
];

export default function CategoryTable() {
  const router = useRouter();
  return (
    <TableContainer sx={{ background: "#fff", borderRadius: 3 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <Typography fontWeight={600}>All Category</Typography>
        <Button>See all</Button>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              onClick={() => {
                router.push("/dashboard/orders/view/" + 34567);
              }}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover td ": { background: "#f7f7f7" },
                "&:hover th ": { background: "#f7f7f7" },
              }}
            >
              <TableCell>{row.label}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="right">
                <ButtonBase>
                  <RemoveIcon
                    style={{ background: "#aaa", borderRadius: 20 }}
                  />
                </ButtonBase>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
