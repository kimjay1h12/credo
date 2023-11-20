import React, { useState } from "react";
import MainLayout from "../../layouts/Mainlayouts";
import { makeStyles } from "@mui/styles";
import { Grid, ButtonBase, Typography, Button } from "@mui/material";
// import { sizes } from "../../array.json";
import CartQuantityButton from "../../components/custom/QuantityItems";
import ProductsItem from "../../components/Products/ProductsItem";
const useStyles = makeStyles({
  root: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 15,
    },
  },
  header: {
    padding: 0,
    ["@media (min-width : 1200px)"]: {
      padding: 100,
    },
  },
  wrapper: {
    ["@media (min-width : 1200px)"]: {
      padding: 30,
    },
    marginBottom: 30,
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  activesize: {},
});
const sizes = [
  {
    label: "XS",
    value: "xs",
  },
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
];
function Index() {
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("xs");
  const classes = useStyles();
  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.header}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6}>
              <img src="/img/test.png" className={classes.img} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <Typography gutterBottom variant="h4">
                  Credo Shirt air Cg{" "}
                </Typography>
                <Typography variant="h6" fontWeight={800}>
                  {" "}
                  $120.00
                </Typography>
                <Typography gutterBottom mt={3}>
                  Size
                </Typography>
                <div className={classes.row}>
                  {sizes.map((cur, i) => (
                    <ButtonBase
                      onClick={() => {
                        setSelectedSize(cur.value);
                      }}
                      key={i}
                      sx={{
                        height: 40,
                        width: 40,
                        display: "flex",
                        // flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "#000",
                        borderWidth: 1,
                        borderStyle: "solid",
                        backgroundColor: selectedSize === cur.value && "#000",
                        color: selectedSize === cur.value && "#fff",
                      }}
                    >
                      {cur.label}
                    </ButtonBase>
                  ))}
                </div>
                <div>
                  <Typography mt={3}>Quantity</Typography>
                  <CartQuantityButton
                    handleChange={(e) => {
                      setQuantity(e);
                    }}
                    quantity={quantity}
                  />
                </div>
                <div>
                  <Button
                    style={{ marginBottom: 7, marginTop: 25 }}
                    fullWidth
                    color="secondary"
                    variant="contained"
                    size="large"
                  >
                    ADD TO CART
                  </Button>
                  <Button size="large" fullWidth variant="contained">
                    Buy Now
                  </Button>
                </div>
                <div>
                  <Typography mb={1} mt={3} fontWeight={600}>
                    Description
                  </Typography>
                  <Typography color={"#6A6A6A"}>
                    a harmonious blend of style and comfort. Crafted with
                    meticulous attention to detail, this shirt exemplifies
                    timeless elegance. Its exquisite fabric offers a soft,
                    luxurious feel against your skin, ensuring day-long comfort.
                    The tailored fit accentuates your silhouette, making it
                    suitable for both formal occasions.
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography
            mt={3}
            mb={3}
            align="center"
            fontWeight={600}
            variant="h6"
          >
            Check this out
          </Typography>
          <div className={classes.wrapper}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((cur) => (
                <Grid item key={cur} sm={6} xs={6} md={3}>
                  <ProductsItem url />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
