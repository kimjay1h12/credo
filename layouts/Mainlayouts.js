import Head from "next/head";

import { makeStyles } from "@mui/styles";
import Toolbar from "../components/Toolbar";

import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import {
  getAllAdminProducts,
  getAllUserProducts,
} from "../context/actions/productsActions";
import { CircularProgress } from "@mui/material";
import { getCart } from "../context/actions/cart";
import { getAllCategory } from "../context/actions/categoryAction";
import { getAllCollections } from "../context/actions/collectionAction";
import { getCurrentUser } from "../context/actions/auth";

const useStyles = makeStyles({
  loading: {
    display: "flex",
    height: "100vh",
    width: "100vw",

    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    zIndex: 2000,
  },
  main: {
    background: "#fff",
    minHeight: "100vh",
  },
});

function MainLayout({
  route,
  loading,
  title,
  description,
  image,
  children,
  mobileroute,
  background,
}) {
  const router = useRouter();

  const classes = useStyles();
  const {
    authState: { loggedIn, data, setup_data },
    productDispatch,
    cartDispatch,
    cartState,
    collectionsDispatch,
    cartegoryDispatch,
    adminProductsDispatch,
    authDispatch,
  } = useContext(GlobalContext);
  // const { cartState } = useContext(GlobalContext);
  useEffect(() => {
    setTimeout(() => {
      getAllUserProducts(productDispatch);
      getCart(cartDispatch);
      getAllCategory(cartegoryDispatch);
      getAllCollections(collectionsDispatch);
      getAllAdminProducts(adminProductsDispatch);
      getCurrentUser(authDispatch);
    }, 500);
    // client.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  }, []);
  return (
    <>
      <Head>
        <title>{title || "credo"}</title>
        <meta property="og:title" content={title || "Home | credo"} />
        <meta property="og:image" content={image || "/img/logo.png"} />
        <meta name="theme-color" content="#000" />
        <link rel="shortcut icon" href="/img/logo.png" />
        <meta
          name="description"
          content={description || "Find And PurChase Your Favourite Clothes"}
        />
        <meta
          property="og:description"
          content={description || "Find And PurChase Your Favourite Clothes"}
        />
      </Head>
      <Toolbar route={route} />
      <main className={classes.main}>{children}</main>
      {loading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      <Footer />
    </>
  );
}

export default MainLayout;
