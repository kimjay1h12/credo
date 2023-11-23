import {
  Button,
  ButtonBase,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context";
import { signInHandler } from "../../../context/actions/auth";

const useStyles = makeStyles({
  root: {
    height: "90vh",

    "& .MuiTextField-root": {
      minWidth: "100%",
    },
    "& img": {
      width: 100,
      height: 70,
      marginTop: 10,
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    height: "100%",
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  forgottenpassword: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
function Index() {
  // const router = useRouter();
  const classes = useStyles();
  const { authDispatch, authState } = useContext(GlobalContext);
  // console.log("authsatat", authState);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const HandleSignIn = async () => {
    setLoading(true);
    const res = await signInHandler(formData, authDispatch);

    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src="/img/logo.png" />
      </div>
      <Divider />
      <div className={classes.content}>
        <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
          {/* <Typography>ghjkl;</Typography> */}
          <TextField
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            type="email"
            label="Email"
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
          <div className={classes.forgottenpassword}>
            <Button
              variant="text"
              onClick={() => {
                router.push("/auth/forgottenpassword");
              }}
            >
              Forgotten Password
            </Button>
          </div>
          <Button
            onClick={() => {
              HandleSignIn();
            }}
            size="large"
            variant="contained"
            fullWidth
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "#fff" }} />
            ) : (
              "Login"
            )}
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              marginTop: 10,
            }}
          >
            <Typography variant="body2" color={"#6A6A6A"}>
              {"Don’t have an account"}
            </Typography>
            <ButtonBase
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              Sign Up
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
