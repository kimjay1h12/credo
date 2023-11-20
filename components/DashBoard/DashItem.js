import { Typography } from "@mui/material";
import React from "react";

function DashItem({ value, label, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        width: "100%",
        minHeight: 160,
        borderRadius: 15,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img src={icon} alt="" style={{ width: 50, height: 50 }} />
      <Typography>{label}</Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </div>
  );
}

export default DashItem;
