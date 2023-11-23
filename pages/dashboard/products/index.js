import React from "react";
import { Typography, Button } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../context";
import { useEffect } from "react";
import {
  deleteAdminProducts,
  getAllUserProducts,
} from "../../../context/actions/productsActions";
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
  const {
    // productState: { data },
    productDispatch,
    adminProductsDispatch,
    adminProductsState: { data },
  } = useContext(GlobalContext);
  useEffect(() => {
    getAllUserProducts(productDispatch);
  }, []);

  return (
    <MiniDrawer active={"product"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" fontWeight={500}>
            Products
          </Typography>
          <Button
            onClick={() => {
              router.push("/dashboard/products/add");
            }}
            size="small"
            variant="contained"
            sx={{ background: "#1872F6" }}
          >
            Add Products
          </Button>
        </div>
        <ProductTable rows={data} />
      </div>
    </MiniDrawer>
  );
}

export default Index;
