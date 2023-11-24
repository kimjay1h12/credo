import React, { useContext, useEffect } from "react";
import MainLayout from "../../layouts/Mainlayouts";
import { Button, Grid, Hidden, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { homeheaderimage } from "../../array.json";
import ProductsItem from "../Products/ProductsItem";
import ImageGrid from "../custom/ImageGrid";
import { GlobalContext } from "../../context";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getAllCollections } from "../../context/actions/collectionAction";
import { getRandomItems } from "../../utility";
import { useRouter } from "next/router";
import client from "../../api/client";
import { useState } from "react";
const useStyles = makeStyles({
  root: {},
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    overflowX: "auto",
    whiteSpace: "nowrap",
    // display: flex;
  },
  wrapper: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
    marginBottom: 30,
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
    cursor: "pointer",
    ["@media (min-width : 1200px)"]: {
      width: "33%",
      height: "75vh",
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  collectionimage: {
    width: "100%",
    height: 450,
  },
  collections: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 70,
    },

    marginTop: 10,
    marginBottom: 20,
  },
  banner: {
    marginTop: 30,
    marginBottom: 30,
  },
  bannerimg: {
    height: 300,
    width: "100%",
    ["@media (min-width : 1200px)"]: {
      height: "80vh",
    },
  },
});
const homeheaderimage = ["/img/img1.png", "/img/img4.png", "/img/img3.png"];
function HomePage() {
  const router = useRouter();
  const {
    collectionsState,
    collectionsDispatch,
    cartegoryState,
    productState: { data },
  } = useContext(GlobalContext);
  const res = collectionsState.data;
  // console.log(collectionsState.data, "collectionsState");
  useEffect(() => {
    getAllCollections(collectionsDispatch);
  }, []);

  const classes = useStyles();
  return (
    <MainLayout route="home">
      <div className={classes.root}>
        <div className={classes.header}>
          <Hidden smUp>
            <Carousel
              className={classes.imageCon}
              autoPlay
              infiniteLoop
              showThumbs={false}
            >
              {[...collectionsState?.data].splice(0, 3)?.map((cur, i) => (
                <img
                  src={cur.image}
                  onClick={() => {
                    router.push("/collections/" + cur.id);
                  }}
                  key={i}
                  className={classes.img}
                />
              ))}
            </Carousel>
          </Hidden>

          <Hidden smDown>
            {[...collectionsState?.data].splice(0, 3)?.map((cur, i) => (
              <img
                src={cur.image}
                onClick={() => {
                  router.push("/collections/" + cur.id);
                }}
                key={i}
                className={classes.img}
              />
            ))}
          </Hidden>
        </div>
        <div
          className={classes.center}
          style={{ marginTop: 30, marginBottom: 50 }}
        >
          <Button
            onClick={() => {
              router.push("/shop");
            }}
            variant="contained"
          >
            Shop Now
          </Button>
        </div>
        <div className={classes.center}>
          <Typography fontWeight={600} variant="h6">
            Featured Products
          </Typography>
        </div>
        <div className={classes.wrapper}>
          <Grid
            container
            spacing={{ xs: 2, md: 6 }}
            // flexWrap={"wrap"}
            // justifyContent={"center"}
          >
            {getRandomItems([...data], 8)?.map((cur, i) => (
              <Grid item key={i} sm={6} xs={6} md={2.4}>
                <ProductsItem {...cur} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.center}>
          <Typography fontWeight={600} variant="h6">
            New Collections
          </Typography>
        </div>
        <div className={classes.collections}>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12} md={6}>
              <img
                src={collectionsState?.data[4]?.image}
                className={classes.collectionimage}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
              <img
                src={collectionsState?.data[5]?.image}
                className={classes.collectionimage}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.center}>
          <Button
            onClick={() => {
              router.push("/collections");
            }}
            variant="outlined"
            size="large"
          >
            Shop Collections
          </Button>
        </div>
        <div className={classes.banner}>
          <img
            onClick={() => {
              router.push("/collections/" + collectionsState.data[6]?.id);
            }}
            src={collectionsState.data[6]?.image}
            className={classes.bannerimg}
          />
        </div>
        <div className={classes.center}>
          <Typography fontFamily={"Rolaxs"} fontWeight={600} variant="h6">
            New Arrivals
          </Typography>
        </div>
        <div className={classes.wrapper}>
          <Grid container spacing={{ xs: 2, md: 6 }}>
            {getRandomItems([...data], 8)?.map((cur, i) => (
              <Grid item key={i} sm={6} xs={6} md={2.4}>
                <ProductsItem {...cur} />
              </Grid>
            ))}
          </Grid>
        </div>
        <ImageGrid images={[...collectionsState?.data]} />
      </div>
    </MainLayout>
  );
}

export default HomePage;
