import React from "react";
import { Typography, Button } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CategoryTable from "../../../components/DashBoard/CategoryTable";
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
    <MiniDrawer active={"category"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" fontWeight={500}>
            Category
          </Typography>
          <Button
            onClick={() => {
              router.push("/dashboard/category/add");
            }}
            size="small"
            variant="contained"
            sx={{ background: "#1872F6" }}
          >
            Add Category
          </Button>
        </div>
        <CategoryTable />
      </div>
    </MiniDrawer>
  );
}

export default Index;
