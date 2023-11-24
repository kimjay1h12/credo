import { Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import { currencyFormatter } from "../../utility";
const useStyles = makeStyles({
  root: {
    width: "100%",
    // height: 300,
    height: "100%",
    padding: 4,

    borderRadius: 10,
    cursor: "pointer",
    "&:hover": {
      background: "#FCFCFC",
      boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.1)",
    },
    "&::active": {
      background: "#FCFCFC",
    },
  },

  img: {
    height: 160,
    width: "100%",
    objectFit: "cover",
    borderRadius: 10,
    ["@media (min-width : 1200px)"]: {
      height: 200,
    },
  },
});

function ProductsItem({ pictures = [], title, price, id }) {
  // console.log("id", id);
  const router = useRouter();
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        router.push("/product/" + id);
      }}
      className={classes.root}
    >
      <img src={pictures[0]?.url} className={classes.img} />
      {/* <Divider /> */}
      <Typography variant="caption" fontWeight={400}>
        {title.slice(0, 20)}
        {/* {" ..."} */}
      </Typography>
      <Typography
        // color={"gray"}
        // style={{ textDecorationLine: "line-through" }}
        variant="body2"
        // ml={1}
        gutterBottom
        fontWeight={600}
      >
        {currencyFormatter(price)}
      </Typography>
      {/* <Typography
        color={"gray"}
        style={{ textDecorationLine: "line-through" }}
        variant="body2"
        // ml={1}
        gutterBottom
        fontWeight={600}
      >
        {currencyFormatter(price + 100)}
      </Typography> */}
    </div>
  );
}

export default ProductsItem;
