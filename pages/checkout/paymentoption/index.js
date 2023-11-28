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
import {
  UpdateOrderCheckoutPayment,
  UpdateOrderPayment,
} from "../../../context/actions/paymentAction";
import { makeStyles } from "@mui/styles";
import { usePaystackPayment } from "react-paystack";

import CheckoutItem from "../../../components/Checkout/CheckoutItem";
import { useRouter } from "next/router";
import {
  currencyFormatter,
  generateRandomTransactionReference,
  sumTotal,
} from "../../../utility";
import { useContext } from "react";
import { GlobalContext } from "../../../context";
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const { authState } = useContext(GlobalContext);
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
  // console.log(new Date().toString());
  const [paystackConfig, setPaystackConfig] = useState({
    // reference: new Date().getTime().toString(),
    reference: null,
    email: product?.billingInfo?.emailAddress,
    amount: product?.amount,
    publicKey: "pk_test_fccd6a7de236c376d5be2ae695bc1d281cff567f",
  });

  const initializePayment = usePaystackPayment(paystackConfig);
  // const [loading, setloading] = useState(second)
  const onSuccess = async (reference) => {
    if (!product?.length > 0) {
      const res = await UpdateOrderPayment(product.id, {
        paymentMethod: paymentMethod,
        paymentReference: reference?.trans?.toString(),
        paymentStatus: "paid",
      });
      router.push({
        pathname: "/payment/success",
        query: {
          data: JSON.stringify(product),
        },
      });
    } else {
      const res = await UpdateOrderCheckoutPayment({
        orderId: product.map((cur) => {
          return cur.id;
        }),

        paymentMethod: paymentMethod,
        paymentReference: reference?.trans?.toString(),
        paymentStatus: "paid",
      });
      if (res) {
        router.push({
          pathname: "/payment/success",
          query: {
            data: JSON.stringify(product),
          },
        });
      }
    }
  };
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
                  <Radio
                    checked={paymentMethod === "payStack"}
                    onClick={() => {
                      setPaymentMethod("payStack");
                    }}
                  />
                  <div>
                    <Typography>Pay via Paystack</Typography>
                    <Typography variant="body2" color={"#A2A2A2"}>
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
              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <div
                style={{
                  // marginTop: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Radio
                    checked={paymentMethod === "bitcoin"}
                    onClick={() => {
                      setPaymentMethod("bitcoin");
                    }}
                  />
                  <div>
                    <Typography>Pay via Cryptocurency</Typography>
                    <Typography variant="body2" color={"#A2A2A2"}>
                      Pay with Bitcoin, ethereum & other cryptocurrencies
                    </Typography>
                  </div>
                </div>
                <img
                  src="/img/bitcoin.png"
                  alt="Pay"
                  style={{ width: 50, height: 50 }}
                />
              </div>
              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <div
                style={{
                  marginTop: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Radio
                    checked={paymentMethod === "banktransfer"}
                    onClick={() => {
                      setPaymentMethod("banktransfer");
                    }}
                  />
                  <div>
                    <Typography>Pay via Bank transfer</Typography>
                    <Typography variant="body2" color={"#A2A2A2"}>
                      Pay with your bank via transfer
                    </Typography>
                  </div>
                </div>
                <img
                  src="/img/bank.png"
                  alt="Pay"
                  style={{ width: 50, height: 50 }}
                />
              </div>
              <Divider style={{ marginTop: 10 }} />
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <div
              className={classes.container}
              style={{ background: "#6A6A6A20", height: "100%" }}
            >
              <Typography>Order Summary</Typography>

              <div>
                {!product?.length > 0 ? (
                  <CheckoutItem product={product} />
                ) : (
                  product?.map((cur, i) => (
                    <CheckoutItem key={i} product={cur} />
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
                      {!product?.length > 0
                        ? currencyFormatter(product?.amount)
                        : currencyFormatter(sumTotal(product))}
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
                      {!product?.length > 0
                        ? currencyFormatter(product?.amount)
                        : currencyFormatter(sumTotal(product))}
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
            disabled={paymentMethod === ""}
            onClick={() => {
              if (paymentMethod === "payStack") {
                setPaystackConfig({
                  ...paystackConfig,
                  reference: generateRandomTransactionReference(),
                  email:
                    product?.billingInfo?.emailAddress ||
                    product[0]?.billingInfo?.emailAddress,
                  amount:
                    !product?.length > 0
                      ? product?.amount * 100
                      : sumTotal(product) * 100,
                });
              } else {
                if (paymentMethod === "bitcoin") {
                  if (product?.length > 0) {
                    router.push({
                      pathname: "/checkout/bitcoin",
                      query: {
                        data: JSON.stringify(
                          [...product]
                          // paymentMethod: paymentMethod,
                        ),
                      },
                    });
                  } else {
                    router.push({
                      pathname: "/checkout/bitcoin",
                      query: {
                        data: JSON.stringify(
                          product
                          // paymentMethod: paymentMethod,
                        ),
                      },
                    });
                  }
                } else {
                  if (product?.length > 0) {
                    router.push({
                      pathname: "/checkout/banktransfer",
                      query: {
                        data: JSON.stringify(
                          [...product]

                          // paymentMethod: paymentMethod,
                        ),
                      },
                    });
                  } else {
                    router.push({
                      pathname: "/checkout/banktransfer",
                      query: {
                        data: JSON.stringify(
                          product

                          // paymentMethod: paymentMethod,
                        ),
                      },
                    });
                  }
                }
              }
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
