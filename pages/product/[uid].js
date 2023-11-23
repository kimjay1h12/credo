import React, { useContext, useState } from "react";
import MainLayout from "../../layouts/Mainlayouts";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  ButtonBase,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
// import { sizes } from "../../array.json";
import CartQuantityButton from "../../components/custom/QuantityItems";
import ProductsItem from "../../components/Products/ProductsItem";
import { useRouter } from "next/router";
import client from "../../api/client";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-carousel";

// import ImageCarousel from "../../components/custom/ImageSlide";
import SlidingImageBackground from "../../components/custom/ImageSlide";
import { currencyFormatter } from "../../utility";
import { GlobalContext } from "../../context";
import { getCart } from "../../context/actions/cart";
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
    height: 400,
    objectFit: "contain",
    borderRadius: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  activesize: {},
});

function Index() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { uid } = router.query;
  const { cartDispatch } = useContext(GlobalContext);
  // console.log(uid, router.query);
  const [selectedSize, setSelectedSize] = useState("S");
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [cartLoading, setCartLoading] = useState(false);
  const FetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = (await client.get(`/api/v1/Product/getProductDetails/${uid}`))
        .data;
      console.log("Product Details", res.data);
      setProductDetails(res.data);
    } catch (error) {
      console.log("error fetching product details", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchProductDetails();
    // }
  }, [uid]);

  const AddItemToCart = async (id) => {
    setCartLoading(true);
    try {
      const res = (
        await client.post(`/api/v1/Cart/addToCart/${uid}`, {
          noOfItems: quantity,
        })
      ).data;
      console.log("daa", res);
      alert("Product added to cart");
      getCart(cartDispatch);
    } catch (error) {
      alert(error.response?.data?.message);

      console.log("error adding item to cart", error.response);
    }
    setCartLoading(false);
  };
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  // const classes = useStyles();
  const FetchProductByCategory = async (id) => {
    setLoading(true);
    if (id)
      try {
        const res = (
          await client.get(`/api/v1/Product/getProductsByCollection/${id}`)
        ).data;
        console.log("products", res);
        setProducts(res.data);
      } catch (error) {
        console.log("error fetchin product by id", error.response);
      }
    setLoading(false);
  };
  useEffect(() => {
    if (productDetails.categories)
      FetchProductByCategory(productDetails?.categories[0]?.id);
  }, [productDetails]);

  const classes = useStyles();
  return (
    <MainLayout loading={loading}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6}>
              {/* <SlidingImageBackground images={productDetails?.pictures} /> */}
              <Carousel
                className={classes.imageCon}
                autoPlay
                infiniteLoop
                showThumbs={false}
              >
                {productDetails?.pictures?.map((cur, i) => (
                  <img src={cur.url} className={classes.img} key={i} />
                ))}
              </Carousel>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <Typography gutterBottom variant="h4">
                  Credo Shirt air Cg{" "}
                </Typography>
                <Typography variant="h6" fontWeight={800}>
                  {currencyFormatter(productDetails?.price)}
                </Typography>
                <Typography gutterBottom mt={3}>
                  Size
                </Typography>
                <div className={classes.row}>
                  {productDetails.sizeVariant &&
                    JSON?.parse(productDetails?.sizeVariant).map((cur, i) => (
                      <ButtonBase
                        onClick={() => {
                          setSelectedSize(cur);
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
                          backgroundColor: selectedSize === cur && "#000",
                          color: selectedSize === cur && "#fff",
                        }}
                      >
                        {cur}
                      </ButtonBase>
                    ))}
                </div>
                <div>
                  <Typography mt={3}>Quantity</Typography>
                  <CartQuantityButton
                    handleChange={(e) => {
                      setQuantity(e);
                    }}
                    max={productDetails?.quantityAvailable}
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
                    onClick={() => {
                      AddItemToCart(uid);
                    }}
                  >
                    {cartLoading ? <CircularProgress /> : "ADD TO CART"}
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
                    {productDetails?.description}
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
              {[...products]?.splice(0, 8)?.map((cur) => (
                <Grid item key={cur} sm={6} xs={6} md={3}>
                  <ProductsItem {...cur} />
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
