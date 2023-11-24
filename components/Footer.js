import {
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { useState } from "react";
import client from "../api/client";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
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
  const {
    collectionsState: { data },
  } = useContext(GlobalContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const HandleJoinCommunity = async () => {
    setLoading(true);
    try {
      const res = (
        await client.post("/api/v1/Subscribe/joinCommunity", {
          email: "string",
        })
      ).data;
      setEmail("");
      alert(
        `Your subscription request was successfully mail will be sent to ${email} `
      );
      setEmail("");
    } catch (error) {
      console.log("response error", error.response);
    }
    setLoading(false);
  };
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
          <TextField
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            size="small"
            label="Enter Your Email"
          />
        </div>
        <Button
          onClick={() => {
            HandleJoinCommunity();
          }}
          disabled={email === ""}
          style={{ marginBottom: 20 }}
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={20} style={{ color: "#fff" }} />
          ) : (
            "Join Now"
          )}
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
                Categorires
              </Typography>
              {[...data]?.splice(0, 5)?.map((cur, i) => (
                // <ButtonBase key={i}>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/collections/" + cur.id);
                  }}
                  variant="body2"
                >
                  {cur.title}
                </Typography>
                // </ButtonBase>
              ))}
            </div>
          </Grid>
          {/* <Grid item md={3.5} sm={6} xs={6}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Typography variant="h6" fontWeight={700}>
                Help
              </Typography>
              <Typography variant="body2">Refund and Return policy</Typography>
              <Typography variant="body2">Privacy policy</Typography>
              <Typography variant="body2">Terms of services</Typography>
            </div>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
