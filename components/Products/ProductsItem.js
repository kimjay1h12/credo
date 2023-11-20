import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 20,
    background: "#f7f7f7",
    borderRadius: 10,
    cursor: "pointer",
  },
});

function ProductsItem({ url }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        router.push("/product/" + 12345);
      }}
      className={classes.root}
    >
      <img
        src={url ? "/img/test.png" : "/img/img2.png"}
        style={{ height: "100%", width: "100%" }}
      />
      <Typography fontWeight={400}>Credo Shirt air Cg </Typography>
      <Typography fontWeight={800}>$120.00</Typography>
    </div>
  );
}

export default ProductsItem;
