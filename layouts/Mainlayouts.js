import Head from "next/head";

import { makeStyles } from "@mui/styles";
import Toolbar from "../components/Toolbar";

import { useRouter } from "next/router";
import Footer from "../components/Footer";

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

  return (
    <>
      <Head>
        <title>{title || "agbero"}</title>
        <meta property="og:title" content={title || "Home | credo"} />
        <meta property="og:image" content={image || "/img/logo.png"} />
        <meta name="theme-color" content="#000" />
        <link rel="shortcut icon" href="/img/favicon.png" />
        <meta
          name="description"
          content={description || "Find  specials, and coupons for free"}
        />
        <meta
          property="og:description"
          content={description || "Find  specials, and coupons for free"}
        />
      </Head>
      <Toolbar route={route} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
