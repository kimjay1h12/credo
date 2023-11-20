import { Box, Typography } from "@mui/material";
import React from "react";

function Broken() {
  return (
    <Box
      sx={{
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        textAlign: {
          xs: "center",
          lg: "left",
        },
        padding: {
          xs: 2,
          lg: "5vh 5vw",
        },
      }}
    >
      <img
        style={{ maxWidth: "90%", height: "40vh", objectFit: "contain" }}
        src="/img/404.png"
      />
      <Box>
        <Typography variant="h4" gutterBottom>
          This Content Isn&apos;t Available Right Now
        </Typography>
        <Typography color="textSecondary">
          When this happens, it&apos;s usually because you followed a broken
          link or the content has been deleted
        </Typography>
      </Box>
    </Box>
  );
}

export default Broken;
