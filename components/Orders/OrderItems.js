import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { currencyFormatter } from "../../utility";
function OrderItem({ product }) {
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between",
        background: "#fff",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <img src={product?.productImage} style={{ width: 80, height: 80 }} />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 5,
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography variant="body2">{product?.productName}</Typography>
          <Typography fontWeight={800} variant="body2">
            Quantity : {product?.noOfItems}
          </Typography>
        </div>
      </div>
      <div style={{}}>
        <Typography variant="body2" fontWeight={800}>
          {currencyFormatter(product?.amount)}
        </Typography>
      </div>
    </div>
  );
}

export default OrderItem;
