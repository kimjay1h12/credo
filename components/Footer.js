import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles({
  root: {
    minHeight: "30vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 40,
  },
});
function Footer() {
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.center}
        style={{ flexDirection: "column", padding: 15 }}
      >
        <Typography fontWeight={600} variant="h6">
          Join our community
        </Typography>
        <Typography align="center" gutterBottom color="GrayText">
          Join our community list, and receive some of the best deals possible.
        </Typography>
        <div
          style={{
            maxWidth: 500,
            width: "100%",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <TextField fullWidth size="small" label="Enter Your Email" />
        </div>
        <Button style={{ marginBottom: 20 }} variant="contained">
          Join Now
        </Button>
      </div>
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item md={3.5} sm={6} xs={6}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <img
                src="/img/logo2.png"
                style={{ height: 60, width: 60, objectFit: "contain" }}
              />
              <Typography variant="body2">Lagos, Nigeria</Typography>
              <Typography variant="body2">+234 5698 8737 73</Typography>
              <Typography variant="body2">Credoculture@gmail.com</Typography>
            </div>
          </Grid>
          <Grid item md={3.5} sm={6} xs={6}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Typography variant="h6" fontWeight={700}>
                Shop
              </Typography>
              <Typography variant="body2">Shirts</Typography>
              <Typography variant="body2">Shorts</Typography>
              <Typography variant="body2">Caps</Typography>
              <Typography variant="body2">Glasses</Typography>
            </div>
          </Grid>
          <Grid item md={3.5} sm={6} xs={6}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Typography variant="h6" fontWeight={700}>
                Help
              </Typography>
              <Typography variant="body2">Refund and Return policy</Typography>
              <Typography variant="body2">Privacy policy</Typography>
              <Typography variant="body2">Terms of services</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
