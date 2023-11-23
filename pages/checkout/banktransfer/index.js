import React from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import CheckoutItem from "../../../components/Checkout/CheckoutItem";
import { useRouter } from "next/router";
const useStyles = makeStyles({
  container: {
    padding: 15,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },
  imageSelector: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#1872F6",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#aaa",
    borderStyle: "solid",
    minHeight: 220,
    width: "100%",
    padding: 36,
  },
});
function Index() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <CheckoutLayout>
      {" "}
      <Grid container>
        <div className={classes.container}>
          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Typography gutterBottom align="center">
              BANK TRANSFER PAYMENT
            </Typography>
            <div className={classes.content}>
              <Typography align="center" mb={3} variant="caption">
                Make a Bank Transfer(In Nigerian NGN) of the required amount to
                the following account: NOTE : that our conversion rate is 970NGN
                to $1 and we will confirm all payments before processing your
                order.
              </Typography>
              <Typography mt={4}>Name: Credo</Typography>
              <Typography> Account Number: 000011111</Typography>
              <Typography>Bank Name: Access Bank</Typography>
            </div>
            <Typography mt={4}>Proof of payment</Typography>
            <TextField
              label="Amount"
              style={{ marginBottom: 20, marginTop: 20 }}
              fullWidth
            />
            <TextField
              label="Bank paid from"
              fullWidth
              style={{ marginBottom: 20, marginTop: 20 }}
            />
            <div
              // onClick={() => {
              //   handleUploadImage();
              // }}
              className={classes.imageSelector}
            >
              <Button
                sx={{
                  backgroundColor: "#1872F6",
                  color: "#fff",
                }}
                // onClick={() => {
                //   handleUploadImage();
                // }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Payment Proof
              </Button>
            </div>
          </Grid>
        </div>
      </Grid>
    </CheckoutLayout>
  );
}

export default Index;
