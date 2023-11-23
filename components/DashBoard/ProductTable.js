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
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { deleteAdminProducts } from "../../context/actions/productsActions";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ProductTable({ rows }) {
  const router = useRouter();
  const { adminProductsDispatch, productDispatch } = useContext(GlobalContext);
  const HandleDeleteProduct = async (id) => {
    const res = await deleteAdminProducts(productsDispatch, id);
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
        <Typography fontWeight={600}>All Products ({rows.length})</Typography>
        <Button>See all</Button>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
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
              <TableCell>
                <img
                  src={row.pictures[0]?.url}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.quantityAvailable}</TableCell>
              <TableCell align="right">
                <ButtonBase
                  onClick={() => {
                    HandleDeleteProduct(row.id);
                  }}
                >
                  <RemoveIcon
                    style={{
                      background: "red",
                      borderRadius: 20,
                      color: "#fff",
                    }}
                  />
                </ButtonBase>
                <ButtonBase
                  onClick={() => {
                    router.push("/dashboard/products/edit/" + row.id);
                  }}
                  sx={{ marginLeft: 3 }}
                >
                  <EditIcon style={{ background: "#aaa", borderRadius: 20 }} />
                </ButtonBase>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
