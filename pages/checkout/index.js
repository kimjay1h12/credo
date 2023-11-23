import React from "react";
import CheckoutLayout from "../../layouts/CheckoutLayout";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import client from "../../api/client";
import {
  currencyFormatter,
  isFormDataComplete,
  sumPrices,
} from "../../utility";
import { getCart } from "../../context/actions/cart";
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
  const { authState, cartState, cartDispatch } = useContext(GlobalContext);
  //  const router = useRouter();

  const [product, setProduct] = useState({});
  const { data } = router.query;
  // console.log(JSON?.parse(data));
  // const product = JSON?.parse(data);
  useEffect(() => {
    if (data) setProduct(JSON?.parse(data));
  }, [data]);

  const classes = useStyles();

  const [formData, setFormData] = useState({
    productName: "",
    productImageLink: "",
    noOfItems: "",
    shippingFee: "0",
    billingFirstName: "",
    billingLastName: "",
    billingCompany: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
    billingPhoneNumber: "",
    billingEmailAddress: "",
    amount: "",
    size: "",
  });
  useEffect(() => {
    getCart(cartDispatch);
    if (product)
      setFormData({
        ...formData,
        size: product?.size,
        billingEmailAddress: authState?.data?.user?.email,
        productImageLink:
          product?.pictures?.length > 0 ? product?.pictures[0]?.url : "",
        productName: product?.title,
        noOfItems: product?.noOfItems,
        amount: product?.price,
      });
  }, [product, authState]);
  // console.log(product, "product");
  const isObjectNotEmpty = (obj) => {
    return Object.keys(obj).length !== 0;
  };
  const [loading, setLoading] = useState(false);
  const HandleCreateOrder = async () => {
    setLoading(true);
    try {
      if (isObjectNotEmpty(product)) {
        const res = (await client.post("/api/v1/Order/createOrder", formData))
          .data;
        if (res) {
          router.push({
            pathname: "/checkout/paymentoption",
            query: {
              data: JSON.stringify(res?.data),
            },
          });
        }
      } else {
        const data1 = {
          ...formData,
        };
        delete data1.amount;
        delete data1.productImageLink;
        delete data1.productName;
        delete data1.noOfItems;
        delete data1.size;
        console.log("data1", data1);
        const res = (await client.post("/api/v1/Order/checkout", data1)).data;
        if (res) {
          router.push({
            pathname: "/checkout/paymentoption",
            query: {
              data: JSON.stringify(res?.data),
            },
          });
        }
      }
      // console.log("response", res);
    } catch (error) {
      console.log("error creating order", error);
    }
    setLoading(false);
  };
  console.log(cartState?.data);
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
                  value={formData.billingFirstName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      billingFirstName: e.target.value,
                    });
                  }}
                  label="First Name"
                  size="small"
                  sx={{ width: "48%" }}
                />
                <TextField
                  value={formData.billingLastName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      billingLastName: e.target.value,
                    });
                  }}
                  label="Last Name"
                  size="small"
                  sx={{ width: "48%" }}
                />
              </div>
              <TextField
                value={formData.billingCompany}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    billingCompany: e.target.value,
                  });
                }}
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Company(optional)"
              />
              <TextField
                fullWidth
                size="small"
                label="Address"
                value={formData.billingAddress}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    billingAddress: e.target.value,
                  });
                }}
              />
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
                  label="City"
                  value={formData.billingCity}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      billingCity: e.target.value,
                    });
                  }}
                  size="small"
                  sx={{ width: "32%" }}
                />
                <TextField
                  label="State"
                  value={formData.billingState}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      billingState: e.target.value,
                    });
                  }}
                  size="small"
                  sx={{ width: "32%" }}
                />
                <TextField
                  value={formData.billingPostalCode}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      billingPostalCode: e.target.value,
                    });
                  }}
                  label="Poster Code"
                  size="small"
                  sx={{ width: "32%" }}
                />
              </div>
              <TextField
                value={formData.billingCountry}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    billingCountry: e.target.value,
                  });
                }}
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Country/Region"
              />
              <TextField
                value={formData.billingPhoneNumber}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    billingPhoneNumber: e.target.value,
                  });
                }}
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
                label="Phone Number"
              />
              <TextField
                value={formData.billingEmailAddress}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    billingEmailAddress: e.target.value,
                  });
                }}
                fullWidth
                size="small"
                label="Email"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <div
              className={classes.container}
              style={{ background: "#6A6A6A20", height: "100%" }}
            >
              <Typography>Order Summary</Typography>

              <div>
                {Object.keys(product).length != 0 ? (
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
                      {Object.keys(product).length != 0
                        ? currencyFormatter(product?.price)
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
                      {Object.keys(product).length != 0
                        ? currencyFormatter(product?.price)
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
            onClick={() => {
              const res = isFormDataComplete(formData);
              if (res) {
                HandleCreateOrder();
              } else {
                alert("All Field Is Required");
              }
              // router.push("/checkout/paymentoption");
            }}
            size="large"
            style={{ width: 300, marginBottom: 20 }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "#fff" }} />
            ) : (
              "Continue To Payment"
            )}
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
}

export default Index;
