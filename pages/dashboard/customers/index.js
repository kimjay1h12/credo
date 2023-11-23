import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CustomerTable from "../../../components/DashBoard/CustomerTable";
import { GlobalContext } from "../../../context";
import { addIdsToArray } from "../../../utility";
import { useEffect } from "react";
import { getAllCustomers } from "../../../context/actions/cutomersctions";
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
  const {
    customerState: { data },
    customerDispatch,
  } = useContext(GlobalContext);
  console.log("cutomers", data);
  const array = addIdsToArray([...data]);
  const router = useRouter();
  const classes = useStyles();
  useEffect(() => {
    getAllCustomers(customerDispatch);
  }, []);

  return (
    <MiniDrawer active={"customer"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div>
            <Typography variant="h5" fontWeight={500}>
              Customers
            </Typography>
            <Typography color="#666">
              You have a total of {data?.length} customers
            </Typography>
          </div>
        </div>
        <CustomerTable array={array} />
      </div>
    </MiniDrawer>
  );
}

export default Index;
