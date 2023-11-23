import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({});
function CheckoutItem() {
  const classes = useStyles();
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <img src="/img/test.png" style={{ width: 80, height: 80 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
            <Typography>Credo Shirt air Cg </Typography>
            <Typography fontWeight={800}>x 2</Typography>
          </div>
          <Typography color={"#6A6A6A"}>Shipping Fee $10</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={800}>$200</Typography>
        <Typography>$10</Typography>
      </div>
    </div>
  );
}

export default CheckoutItem;