import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { currencyFormatter } from "../../utility";
const useStyles = makeStyles({});
function CheckoutItem({ id, noOfItems, product }) {
  console.log("ghjk", product);
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
        {product?.pictures?.length > 0 && (
          <img
            src={product?.pictures[0]?.url}
            style={{ width: 80, height: 80 }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ gap: 5 }}>
            <Typography variant="body2">{product?.title}</Typography>
            <Typography fontWeight={800} variant="body2">
              Quantity : {product?.noOfItems}
            </Typography>
          </div>
          {/* <Typography color={"#6A6A6A"}>Shipping Fee --</Typography> */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={800} variant="body2">
          {currencyFormatter(product?.price || product?.amount)}
        </Typography>
        {/* <Typography>$10</Typography> */}
      </div>
    </div>
  );
}

export default CheckoutItem;
