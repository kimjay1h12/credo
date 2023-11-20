import React from "react";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { Grid, Typography } from "@mui/material";
import MiniDrawer from "../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import DashItem from "../DashBoard/DashItem";
import BasicTable from "../DashBoard/Table";
const useStyles = makeStyles({
  root: {
    padding: 20,
  },
});
function Dashboard() {
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
    <MiniDrawer active={"home"}>
      <div className={classes.root}>
        <Typography mb={4}>DashBoard</Typography>

        <Grid container spacing={6}>
          {headerArray.map((cur, i) => (
            <Grid item xs={12} key={i} md={3}>
              <DashItem {...cur} />
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: 50 }}>
          <BasicTable />
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Dashboard;
