import React from "react";
import MiniDrawer from "../../../../layouts/Drawer";
import { Divider, Grid, Typography, Button } from "@mui/material";
import OrderItem from "../../../../components/Orders/OrderItems";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { currencyFormatter } from "../../../../utility";
const useStyles = makeStyles({
  root: {},
  container: {
    background: "#fff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  row: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
function Index() {
  const classes = useStyles();
  const router = useRouter();
  const [product, setProduct] = useState({});
  const { data } = router.query;
  // console.log(JSON?.parse(data));
  // const product = JSON?.parse(data);
  useEffect(() => {
    if (data) setProduct(JSON?.parse(data));
  }, [data]);
  // console.log(product, "product");
  const downloadImage = async (imageUrl, filename) => {
    try {
      // Make a GET request to the image URL
      const response = await fetch(imageUrl);

      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(
          `Failed to download image. Status code: ${response.status}`
        );
      }

      // Convert the image data to a blob
      const blob = await response.blob();

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);

      console.log("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error.message);
    }
  };

  return (
    <MiniDrawer active={"orders"}>
      <div style={{ padding: 50, marginTop: 10 }}>
        <Typography gutterBottom variant="h5" fontWeight={600}>
          {product?.orderId}
        </Typography>
        <Typography color={"#6A6A6A"}>
          {new Date(product?.date).toLocaleString()}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <div>
              <OrderItem product={product} />
              <div className={classes.container}>
                <Typography fontWeight={700}>Pending</Typography>
                <div className={classes.row}>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    Sub Total
                  </Typography>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    {currencyFormatter(product?.amount)}
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    Shipping
                  </Typography>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    ---
                  </Typography>
                </div>
                <div className={classes.row} style={{ marginBottom: 20 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {currencyFormatter(product?.amount)}
                  </Typography>
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 15,
                  }}
                >
                  {/* <Button
                    size="small"
                    style={{ background: "#1872F6" }}
                    variant="contained"
                  >
                    Mark as paid
                  </Button> */}
                </div>
              </div>
              <div className={classes.container}>
                <Typography gutterbuttom fontWeight={700}>
                  Payment
                </Typography>
                <Typography mt={2} mb={2} variant="body2" color="#6A6A6A">
                  Customer selected {product?.paymentMethod?.toUpperCase()} as
                  their payment method
                </Typography>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 15,
                  }}
                >
                  {product?.paymentMethod != "payStack" && (
                    <Button
                      onClick={() => {
                        console.log(product);
                        window.open(product?.paymentProof, "_blank");
                      }}
                      size="small"
                      style={{ background: "#1872F6" }}
                      variant="contained"
                    >
                      View Prove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.container}>
              <div>
                <Typography gutterBottom fontWeight={600}>
                  Customer
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  1 Order
                </Typography>
              </div>
              <Divider />
              <div style={{ marginTop: 30 }}>
                <Typography gutterBottom fontWeight={600}>
                  Conctact information
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.emailAddress}
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.phoneNumber}
                </Typography>
              </div>
              <Divider />
              <div style={{ marginTop: 30 }}>
                <Typography gutterBottom fontWeight={600}>
                  Shipping address
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.address}
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.city}
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.state}
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  {product?.billingInfo?.country}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </MiniDrawer>
  );
}

export default Index;
