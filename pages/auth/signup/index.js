import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
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
import { signupHandler } from "../../../context/actions/auth";

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
  const { authDispatch, authState } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log("authsatat", authState);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const HandleSignUp = async () => {
    setLoading(true);
    const res = await signupHandler(formData, authDispatch);
    if (res) {
      router.push("/");
    }
    setLoading(false);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src="/img/logo.png" />
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="h6" align="center" gutterBottom>
          Sign Up
        </Typography>
        <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
          <TextField
            value={formData.fullName}
            onChange={(e) => {
              setFormData({
                ...formData,
                fullName: e.target.value,
              });
            }}
            label="UserName"
            fullWidth
            sx={{ marginBottom: 1 }}
          />
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
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff style={{ color: "#000" }} />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Password"
            fullWidth
            // type="password"
            sx={{ marginBottom: 3 }}
          />

          <Button
            onClick={() => {
              HandleSignUp();
            }}
            size="large"
            variant="contained"
            fullWidth
          >
            {loading ? (
              <CircularProgress style={{ color: "#fff" }} />
            ) : (
              "Sign up"
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
              Already have an account
            </Typography>
            <ButtonBase
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Sign In
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
