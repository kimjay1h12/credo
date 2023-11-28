import React from "react";
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
import CheckoutItem from "../../../components/Checkout/CheckoutItem";
import { useState } from "react";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../context";
import { currencyFormatter, sumPrices } from "../../../utility";
const useStyles = makeStyles({
  container: {
    padding: 15,
    width: "100%",
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },
  content: {
    padding: 15,
    borderWidth: 0.5,
    borderColor: "#aaa",
    borderStyle: "solid",
    marginTop: 20,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
function Index() {
  const { cartState } = useContext(GlobalContext);
  const router = useRouter();
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const { data } = router.query;
  // console.log(JSON?.parse(data));
  // const product = JSON?.parse(data);
  useEffect(() => {
    if (data) setProduct(JSON?.parse(data));
  }, [data]);
  console.log(product, "product");
  return (
    <CheckoutLayout>
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sm={12}>
            <div className={classes.container}>
              <Typography align="center" variant="h5">
                Thank You !
              </Typography>
              <Typography mb={4} align="center">
                Order refernce is CR 1425
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                Order Confirmed
              </Typography>
              <div className={classes.content}>
                <Typography gutterBottom fontWeight={700}>
                  Congratulation! Your order has been confirmed
                </Typography>
                <Typography color={"#aaa"}>
                  Your order has been confirmed and would be processed. Thanks
                  for shopping with us. Your order would be delivered within the
                  next 24hrs.
                </Typography>
              </div>
              <Typography mt={4} variant="h6" fontWeight={600}>
                Order details
              </Typography>
              <div className={classes.content}>
                <div className={classes.row}>
                  <div>
                    <Typography gutterBottom color={"#aaa"}>
                      Contact Information
                    </Typography>
                    <Typography>
                      {product?.billingInfo?.phoneNumber ||
                        product[0]?.billingInfo?.phoneNumber}
                    </Typography>
                  </div>
                  <div>
                    <Typography gutterBottom color={"#aaa"}>
                      Email
                    </Typography>
                    <Typography>
                      {product?.billingInfo?.emailAddress ||
                        product[0]?.billingInfo?.emailAddress}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography color={"#aaa"} gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography gutterBottom>
                    {product?.billingInfo?.address ||
                      product[0]?.billingInfo?.address}
                  </Typography>
                  <Typography gutterBottom>
                    {product?.billingInfo?.state ||
                      product[0]?.billingInfo?.state}
                  </Typography>
                  <Typography gutterBottom>
                    {product?.billingInfo?.city ||
                      product[0]?.billingInfo?.city}
                  </Typography>
                  {/* <Typography gutterBottom>Lagos</Typography> */}
                </div>
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
                {product?.amount != undefined ? (
                  <CheckoutItem product={product} />
                ) : (
                  [...cartState?.data]?.map((cur, i) => (
                    <CheckoutItem
                      product={{ ...cur, ...cur.product }}
                      key={i}
                    />
                  ))
                )}
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
                    <Typography fontWeight={700}>
                      {product?.amount != undefined
                        ? currencyFormatter(product?.amount)
                        : currencyFormatter(
                            cartState.data.length > 0 &&
                              sumPrices(cartState?.data)
                          )}
                    </Typography>
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
                    <Typography fontWeight={700}>
                      {product?.amount != undefined
                        ? currencyFormatter(product?.amount)
                        : currencyFormatter(
                            cartState.data.length > 0 &&
                              sumPrices(cartState?.data)
                          )}
                    </Typography>
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
              router.push("/shop");
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
}

export default Index;
