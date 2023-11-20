import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
function CartItem() {
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
        <img src="/img/test.png" style={{ width: 80, height: 80 }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <Typography>Credo Shirt air Cg </Typography>
          <Typography fontWeight={800}>x 2</Typography>
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
        <ButtonBase>
          <RemoveIcon style={{ background: "#aaa", borderRadius: 20 }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default CartItem;
