import React from "react";
import CheckoutLayout from "../../layouts/CheckoutLayout";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
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
  return (
    <CheckoutLayout>
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sm={12}>
            <div className={classes.container}>
              <Typography>Billing Information</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TextField
                  label="First Name"
                  size="small"
                  sx={{ width: "48%" }}
                />
                <TextField
                  label="Last Name"
                  size="small"
                  sx={{ width: "48%" }}
                />
              </div>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Company(optional)"
              />
              <TextField fullWidth size="small" label="Address" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TextField label="City" size="small" sx={{ width: "32%" }} />
                <TextField label="State" size="small" sx={{ width: "32%" }} />
                <TextField
                  label="Poster Code"
                  size="small"
                  sx={{ width: "32%" }}
                />
              </div>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Country/Region"
              />
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Phone Number"
              />
              <TextField fullWidth size="small" label="Email" />
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
            onClick={() => {
              router.push("/checkout/paymentoption");
            }}
            size="large"
            style={{ width: 300, marginBottom: 20 }}
            variant="contained"
          >
            Continue To Payment
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
}

export default Index;
