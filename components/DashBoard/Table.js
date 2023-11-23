import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { currencyFormatter, formatDateAndTime } from "../../utility";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
//   {
//     orderid: "CR 001",
//     phone: "08123456789",
//     status: "Paid",
//     date: "Sep 11, 2:45PM",
//     amount: "$50.00",
//   },
// ];

export default function BasicTable({ rows }) {
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
        <Typography fontWeight={600}>Recent Orders</Typography>
        <Button
          onClick={() => {
            router.push("/dashboard/orders");
          }}
        >
          See All
        </Button>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              onClick={() => {
                // router.push("/dashboard/orders/view/" + 34567);
                router.push({
                  pathname: "/dashboard/orders/view/",
                  query: {
                    data: JSON.stringify(row),
                  },
                });
              }}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover td ": { background: "#f7f7f7" },
                "&:hover th ": { background: "#f7f7f7" },
              }}
            >
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">
                {row.billingInfo?.phoneNumber}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color:
                    row.paymentStatus === "pending"
                      ? "#FBBB00"
                      : row.paymentStatus === "paid"
                      ? "#00CC08"
                      : "red",
                }}
              >
                {row.paymentStatus}
              </TableCell>
              <TableCell align="right">
                {formatDateAndTime(row.date)?.formattedDate}
              </TableCell>
              <TableCell align="right">
                {currencyFormatter(row.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
