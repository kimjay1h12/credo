import React, { useEffect, useState } from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import {
  Button,
  Divider,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { usePaystackPayment } from "react-paystack";

import CheckoutItem from "../../../components/Checkout/CheckoutItem";
import { useRouter } from "next/router";
const useStyles = makeStyles({
  container: {
    padding: 15,
    width: "100%",
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },
});
function Index() {
  const router = useRouter();
  const classes = useStyles();
  const [paystackConfig, setPaystackConfig] = useState({
    // reference: new Date().getTime().toString(),
    reference: null,
    email: "olawaleadeit@gmail.com",
    amount: 100,
    publicKey: "pk_test_ceaca8935383d360f0869a7a0c4a3cc992d74f73",
  });
  const initializePayment = usePaystackPayment(paystackConfig);
  const onSuccess = (reference) => {};
  const onClose = () => {};

  useEffect(() => {
    if (paystackConfig.reference) initializePayment(onSuccess, onClose);
  }, [paystackConfig]);
  return (
    <CheckoutLayout>
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sm={12}>
            <div className={classes.container}>
              <Typography>Payment </Typography>
              <div
                style={{
                  marginTop: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Radio checked />
                  <div>
                    <Typography>Pay via Paystack</Typography>
                    <Typography color={"#A2A2A2"}>
                      Pay with master card & visa card
                    </Typography>
                  </div>
                </div>
                <img
                  src="/img/paystack.png"
                  alt="Pay"
                  style={{ width: 50, height: 50 }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <div
              className={classes.container}
              style={{ background: "#6A6A6A20", height: "100%" }}
            >
              <Typography>Order Summary</Typography>

              <div>
                <CheckoutItem />
                <Divider />
                <div>
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography color={"#6A6A6A"}>SubTotal</Typography>
                    <Typography fontWeight={700}>$1000</Typography>
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography color={"#6A6A6A"}>Total</Typography>
                    <Typography fontWeight={700}>$1010</Typography>
                  </div>
                </div>
                <Divider />
              </div>
              {/* </div> */}
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            style={{ width: 300, marginBottom: 20 }}
            variant="contained"
            onClick={() => {
              setPaystackConfig({
                ...paystackConfig,
                reference: "sdfghjkl",
              });
            }}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
}

export default Index;
