import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { currencyFormatter } from "../../utility";
function CartItem({ id, noOfItems, product }) {
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <img
          src={product?.pictures[0]?.url}
          style={{ width: 80, height: 80 }}
        />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <Typography variant="body2">{product.title}</Typography>
          <Typography fontWeight={800} variant="body2">
            x {noOfItems}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="body2" fontWeight={800}>
          {currencyFormatter(product?.price)}
        </Typography>
        <ButtonBase>
          <RemoveIcon style={{ background: "#aaa", borderRadius: 20 }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default CartItem;
