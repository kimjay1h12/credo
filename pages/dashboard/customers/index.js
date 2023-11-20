import React from "react";
import { Typography, Button } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CustomerTable from "../../../components/DashBoard/CustomerTable";
const useStyles = makeStyles({
  root: {
    padding: 50,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
});
function Index() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <MiniDrawer active={"customer"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div>
            <Typography variant="h5" fontWeight={500}>
              Customers
            </Typography>
            <Typography color="#666">
              You have a total of 14 customers
            </Typography>
          </div>
        </div>
        <CustomerTable />
      </div>
    </MiniDrawer>
  );
}

export default Index;
