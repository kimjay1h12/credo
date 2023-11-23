import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    // field: "firstName",
    headerName: "First name",
    width: 200,
    editable: true,
    valueGetter: (params) => `${params?.row?.customer?.fullName}`,
  },
  {
    field: "lastName",
    headerName: "Email",
    width: 200,
    editable: true,
    valueGetter: (params) => `${params?.row?.customer?.email}`,
  },
  {
    field: "age",
    headerName: "Verified",
    type: "number",
    width: 150,
    editable: true,
    valueGetter: (params) => `${params?.row?.customer?.emailIsVerified}`,
  },
  {
    field: "fullName",
    headerName: "IsAdmin",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
    valueGetter: (params) => `${params?.row?.customer?.isAdmin}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function CustomerTable({ array }) {
  return (
    <Box
      sx={{
        minHeight: 300,
        width: "100%",
        background: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography p={2}>All customers</Typography>
      <DataGrid
        rows={array}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
