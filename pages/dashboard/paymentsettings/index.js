import React, { useContext } from "react";
import MiniDrawer from "../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
});
function Index() {
  const router = useRouter();
  const classes = useStyles();
  const {
    paymentState: { data },
  } = useContext(GlobalContext);
  // console.log("productdaat", data);
  return (
    <MiniDrawer active={"paymentsettings"}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div>
            <Typography variant="h5" fontWeight={500}>
              Payment Settings
            </Typography>
            <Typography color="#666">Update Payment Settings</Typography>
          </div>
          <Button
            onClick={() => {
              router.push("/dashboard/paymentsettings/add");
            }}
            variant="contained"
          >
            Update Payment
          </Button>
        </div>
        <Grid container spacing={6}>
          <Grid item xs={20} md={6}>
            {(data[0]?.bankName != "" || data[0]?.bankName != null) && (
              <div className={classes.content}>
                <div>
                  <Typography color={"grey"}>Bank name</Typography>
                  <Typography>{data[0]?.bankName}</Typography>
                </div>
                <div style={{ marginTop: 25 }}>
                  <Typography color={"grey"}>Account name</Typography>
                  <Typography>{data[0]?.accountName}</Typography>
                </div>
                <div style={{ marginTop: 25 }}>
                  <Typography color={"grey"}>Account number</Typography>
                  <Typography>{data[0]?.accountNumber}</Typography>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={20} md={6}>
            {(data[0]?.cryptoAddress != "" ||
              data[0]?.cryptoAddress != null) && (
              <div className={classes.content}>
                <div>
                  <Typography color={"grey"}>Crypto wallet address</Typography>
                  <Typography>{data[0]?.cryptoAddress}</Typography>
                </div>
                <div style={{ marginTop: 25 }}>
                  <Typography color={"grey"}>Crypto name</Typography>
                  <Typography>{data[0]?.cryptoName}</Typography>
                </div>
                <div style={{ marginTop: 25 }}>
                  <Typography color={"grey"}>Bar code</Typography>
                  <img
                    src={data[0]?.cryptoBarCodeUrl}
                    style={{ width: 70, height: 70, objectFit: "contain" }}
                  />
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </MiniDrawer>
  );
}

export default Index;
