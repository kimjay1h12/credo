import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CustomerTable from "../../../components/DashBoard/CustomerTable";
import DashItem from "../../../components/DashBoard/DashItem";
import { useContext } from "react";
import { GlobalContext } from "../../../context";
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
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
function Index() {
  const {
    adminProductsState,
    customerState,
    collectionsState,
    cartegoryState,
    orderState,
  } = useContext(GlobalContext);
  const router = useRouter();
  const headerArray = [
    {
      label: "Customers",
      icon: "/img/dash.png",
      value: customerState?.data?.length,
    },
    {
      label: "Collections",
      icon: "/img/dash2.png",
      value: collectionsState?.data?.length,
    },
    {
      label: "Categories",
      icon: "/img/dash3.png",
      value: cartegoryState?.data?.length,
    },
    {
      label: "Total Products",
      icon: "/img/dash3.png",
      value: adminProductsState?.data?.length,
    },
    {
      label: "Total orders",
      icon: "/img/dash4.png",
      value: orderState?.data?.length,
    },
  ];
  const classes = useStyles();
  return (
    <MiniDrawer active={"analytic"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div>
            <Typography variant="h5" fontWeight={500}>
              Analytic
            </Typography>
          </div>
        </div>
        <div className={classes.content}>
          <Grid container spacing={2}>
            {headerArray.map((cur, i) => (
              <Grid item xs={12} key={i} md={3}>
                <DashItem {...cur} />
              </Grid>
            ))}
          </Grid>
        </div>
        {/* <CustomerTable /> */}
      </div>
    </MiniDrawer>
  );
}

export default Index;
