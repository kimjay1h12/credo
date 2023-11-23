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
import {
  forgottenpassword,
  resendPassword,
  verifyOTP,
} from "../../../context/actions/auth";
import { GlobalContext } from "../../../context";

const useStyles = makeStyles({
  root: {
    height: "70vh",
    // height: "100%",

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
  const router = useRouter();
  const { authDispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [steps, setSteps] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpCode, setotpCode] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const HandleForgottenPassword = async () => {
    setLoading(true);
    const res = await forgottenpassword({ email: email }, authDispatch);
    if (res) {
      setSteps(2);
    }
    setLoading(false);
  };
  const HandleVerifyOtp = async () => {
    setLoading(true);
    const res = await verifyOTP({ email: email }, authDispatch);
    if (res) {
      setSteps(3);
    }
    setLoading(false);
  };
  const HandleResetPassword = async () => {
    setLoading(true);
    const res = await resendPassword({ email: email }, authDispatch);
    if (res) {
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src="/img/logo.png" />
      </div>
      <Divider />
      {steps === 1 && (
        <div className={classes.content}>
          <Typography variant="h6" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
            <TextField
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              fullWidth
              sx={{ marginBottom: 1 }}
            />
            <Typography align="center" sx={{ marginBottom: 3 }} variant="body2">
              A 4 digit pin would be sent to your email to retrieve your
              account.
            </Typography>
            <Button
              onClick={() => {
                HandleForgottenPassword();
              }}
              size="large"
              variant="contained"
              fullWidth
            >
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Continue"
              )}
              {/* Continue */}
            </Button>
          </div>
        </div>
      )}
      {steps === 2 && (
        <div className={classes.content}>
          <Typography variant="h6" align="center" gutterBottom>
            Verify Otp
          </Typography>
          <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
            <Typography align="center" sx={{ marginBottom: 3 }} variant="body2">
              Input the 4 digit pin sent to your mail
            </Typography>
            <TextField
              value={otpCode}
              onChange={(e) => {
                setotpCode(e.target.value);
              }}
              type="number"
              label="Email"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <Button
              onClick={() => {
                HandleVerifyOtp();
              }}
              size="large"
              variant="contained"
              fullWidth
            >
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Verify"
              )}
            </Button>
          </div>
        </div>
      )}
      {steps === 3 && (
        <div className={classes.content}>
          <Typography variant="h6" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
            <TextField
              value={new_password}
              onChange={(e) => {
                setNew_password(e.target.value);
              }}
              label="New Password"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              value={confirm_password}
              onChange={(e) => {
                setConfirm_password(e.target.value);
              }}
              label="Confirm Password"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <Button
              size="large"
              onClick={() => {
                HandleResetPassword();
              }}
              variant="contained"
              fullWidth
            >
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
