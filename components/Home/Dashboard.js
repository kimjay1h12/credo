// import { useContext } from "react";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { Grid, Typography } from "@mui/material";
import MiniDrawer from "../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import DashItem from "../DashBoard/DashItem";
import BasicTable from "../DashBoard/Table";
import { useContext } from "react";
import { GlobalContext } from "../../context";
const useStyles = makeStyles({
  root: {
    padding: 20,
  },
});
function Dashboard() {
  const { collectionsState, cartegoryState, customerState } =
    useContext(GlobalContext);
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
