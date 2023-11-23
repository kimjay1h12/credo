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
import { GlobalContext } from "../../context";
import { deleteAdminCategory } from "../../context/actions/categoryAction";

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

export default function CategoryTable({ data }) {
  const router = useRouter();
  const { cartegoryDispatch } = React.useContext(GlobalContext);
  const HandleDelete = async (id) => {
    const res = await deleteAdminCategory(cartegoryDispatch, id);
  };
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
            <TableCell align="center">Id</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              // onClick={() => {
              //   router.push("/dashboard/orders/view/" + 34567);
              // }}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover td ": { background: "#f7f7f7" },
                "&:hover th ": { background: "#f7f7f7" },
              }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="right">
                <ButtonBase
                  onClick={() => {
                    HandleDelete(row.id);
                  }}
                >
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
