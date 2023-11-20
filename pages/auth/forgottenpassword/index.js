import {
  Button,
  ButtonBase,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";

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
  const router = useRouter();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src="/img/logo.png" />
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="h6" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
          <TextField label="Email" fullWidth sx={{ marginBottom: 1 }} />
          <Typography sx={{ marginBottom: 3 }} variant="body2">
            A link would be sent to your email to retrieve your account.
          </Typography>
          <Button size="large" variant="contained" fullWidth>
            Send Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
