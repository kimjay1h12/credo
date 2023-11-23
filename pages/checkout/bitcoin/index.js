import React from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import {
  Button,
  ButtonBase,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import CheckoutItem from "../../../components/Checkout/CheckoutItem";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { uploadHelmper } from "../../../utility";
import { UpdateOrderPayment } from "../../../context/actions/paymentAction";
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
  const [product, setProduct] = useState({});
  const { data } = router.query;
  // console.log(JSON?.parse(data));
  // const product = JSON?.parse(data);
  useEffect(() => {
    if (data) setProduct(JSON?.parse(data));
  }, [data]);
  // console.log(product);
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const handleUploadImage = async () => {
    setImageUploading(true);
    const { url } = await uploadHelmper("image");
    setImageUrl(url);
    // console.log(url);
    setImageUploading(false);
  };
  const HandleCreateOrder = async () => {
    setLoading(true);
    const res = await UpdateOrderPayment(product.id, {
      paymentMethod: product?.paymentMethod,

      paymentStatus: "paid",
      paymentProofUrl: imageUrl,
    });
    if (res) {
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <CheckoutLayout>
      {" "}
      <Grid container>
        <div className={classes.container}>
          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Typography gutterBottom align="center">
              CRPYTO PAYMENT
            </Typography>
            <div className={classes.content}>
              <Typography align="center" mb={3} variant="caption">
                Make a Crypto payment (In Nigerian NGN) of the required amount
                to the following BTC wallet NOTE we will confirm all payments
                before processing your order.
              </Typography>
              <Typography mt={4}>BTC wallet : 02x345783839y53u97d</Typography>
            </div>
            <Typography mt={4}>Proof of payment</Typography>
            {imageUrl != "" && (
              <img
                src={imageUrl}
                style={{ width: "100%", height: 300, objectFit: "cover" }}
              />
            )}
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
                onClick={() => {
                  handleUploadImage();
                }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {imageUploading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "  Upload Payment Proof"
                )}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={imageUrl === ""}
                sx={{ width: 300 }}
                onClick={() => {
                  HandleCreateOrder();
                }}
                variant="contained"
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  " Proceed"
                )}
              </Button>
            </div>
          </Grid>
        </div>
      </Grid>
    </CheckoutLayout>
  );
}

export default Index;
