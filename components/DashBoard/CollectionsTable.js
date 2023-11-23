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
import { deleteAdminCollections } from "../../context/actions/collectionAction";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CollectionsTable({ row }) {
  const { cartegoryDispatch, collectionsDispatch } =
    React.useContext(GlobalContext);
  const HandleDelete = async (id) => {
    const res = await deleteAdminCollections(collectionsDispatch, id);
  };
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
        <Typography fontWeight={600}>All Category ({row?.length})</Typography>
        {/* <Button>See all</Button> */}
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover td ": { background: "#f7f7f7" },
                "&:hover th ": { background: "#f7f7f7" },
              }}
            >
              <TableCell>
                <img
                  src={row.image}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
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
