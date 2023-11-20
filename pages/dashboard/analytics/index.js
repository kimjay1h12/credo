import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CustomerTable from "../../../components/DashBoard/CustomerTable";
import DashItem from "../../../components/DashBoard/DashItem";
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
  const router = useRouter();
  const headerArray = [
    {
      label: "Visitors online",
      icon: "/img/dash.png",
      value: "5",
    },
    {
      label: "Pages viewed",
      icon: "/img/dash2.png",
      value: "12",
    },
    {
      label: "Pages viewed",
      icon: "/img/dash2.png",
      value: "12",
    },
    {
      label: "Pages viewed",
      icon: "/img/dash2.png",
      value: "12",
    },
    {
      label: "Pages viewed",
      icon: "/img/dash2.png",
      value: "12",
    },
    {
      label: "Pages viewed",
      icon: "/img/dash2.png",
      value: "12",
    },
    {
      label: "Total sales",
      icon: "/img/dash3.png",
      value: "150",
    },
    {
      label: "Total orders",
      icon: "/img/dash4.png",
      value: "5",
    },
  ];
  const classes = useStyles();
  return (
    <MiniDrawer active={"customer"}>
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
