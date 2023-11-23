import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import ProductTable from "../../../components/DashBoard/ProductTable";
import { useRouter } from "next/router";
import CategoryTable from "../../../components/DashBoard/CategoryTable";
import CollectionsTable from "../../../components/DashBoard/CollectionsTable";
import { GlobalContext } from "../../../context";
import { useEffect } from "react";
import { getAllCollections } from "../../../context/actions/collectionAction";
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
    collectionsState: { data },
    collectionsDispatch,
  } = useContext(GlobalContext);
  useEffect(() => {
    getAllCollections(collectionsDispatch);
  }, []);

  return (
    <MiniDrawer active={"collections"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" fontWeight={500}>
            Collections
          </Typography>
          <Button
            onClick={() => {
              router.push("/dashboard/collections/add");
            }}
            size="small"
            variant="contained"
            sx={{ background: "#1872F6" }}
          >
            Create Collections
          </Button>
        </div>
        <CollectionsTable row={data} />
      </div>
    </MiniDrawer>
  );
}

export default Index;
