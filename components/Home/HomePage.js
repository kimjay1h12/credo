import React from "react";
import MainLayout from "../../layouts/Mainlayouts";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { homeheaderimage } from "../../array.json";
import ProductsItem from "../Products/ProductsItem";
import ImageGrid from "../custom/ImageGrid";
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
    height: "75vh",
    objectFit: "cover",
    ["@media (min-width : 1200px)"]: {
      width: "33%",
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  collectionimage: {
    width: "100%",
    height: "100%",
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
      height: "90vh",
    },
  },
});
const homeheaderimage = ["/img/img1.png", "/img/img4.png", "/img/img3.png"];
function HomePage() {
  const classes = useStyles();
  return (
    <MainLayout route="home">
      <div className={classes.root}>
        <div className={classes.header}>
          {homeheaderimage?.map((cur, i) => (
            <img src={cur} key={i} className={classes.img} />
          ))}
        </div>
        <div
          className={classes.center}
          style={{ marginTop: 30, marginBottom: 50 }}
        >
          <Button variant="contained">Shop Now</Button>
        </div>
        <div className={classes.center}>
          <Typography fontWeight={600} variant="h6">
            Featured Products
          </Typography>
        </div>
        <div className={classes.wrapper}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((cur) => (
              <Grid item key={cur} sm={6} xs={6} md={3}>
                <ProductsItem />
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
              <img src="/img/nc1.png" className={classes.collectionimage} />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
              <img src="/img/nc2.png" className={classes.collectionimage} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.center}>
          <Button variant="outlined" size="large">
            Shop Collections
          </Button>
        </div>
        <div className={classes.banner}>
          <img src="/img/banner.png" className={classes.bannerimg} />
        </div>
        <div className={classes.center}>
          <Typography fontFamily={"Rolaxs"} fontWeight={600} variant="h6">
            New Arrivals
          </Typography>
        </div>
        <div className={classes.wrapper}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((cur) => (
              <Grid item key={cur} sm={6} xs={6} md={3}>
                <ProductsItem url />
              </Grid>
            ))}
          </Grid>
        </div>
        <ImageGrid images={homeheaderimage} />
      </div>
    </MainLayout>
  );
}

export default HomePage;
