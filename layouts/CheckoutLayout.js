import { Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles({
  root: {
    "& img": {
      width: 90,
      height: 60,
      objectFit: "contain",
      marginTop: 10,
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
function CheckoutLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src="/img/logo.png" />
      </div>
      <Divider />
      <div>{children}</div>
    </div>
  );
}

export default CheckoutLayout;
