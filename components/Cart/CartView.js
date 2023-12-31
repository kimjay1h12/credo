// TopRightDialog.js
import React from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Button, ButtonBase, Divider } from "@mui/material";
import CartItem from "./CartItem";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../context";
const useStyles = makeStyles({
  dialogPaper: {
    position: "absolute",
    top: "-5%",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    ["@media (min-width : 1200px)"]: {
      position: "absolute",
      top: 20,
      right: 20,
      width: "100%",
      maxWidth: 500,
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

const TopRightDialog = ({ open, onClose, message, data }) => {
  // console.log("cartState", data);
  const {
    authState: { loggedIn },
  } = useContext(GlobalContext);
  const classes = useStyles();
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent>
        <div className={classes.row}>
          <Typography>My cart</Typography>
          <ButtonBase
            onClick={() => {
              onClose();
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </div>
        <Divider />
        <Typography mt={2} fontWeight={600}>
          Cart
        </Typography>
        <div>
          {data?.map((cur, i) => (
            <CartItem key={i} {...cur} />
          ))}

          {loggedIn && (
            <Button
              size="large"
              sx={{ marginTop: 4 }}
              fullWidth
              variant="contained"
              onClick={() => {
                router.push("/checkout/");
              }}
            >
              Checkout
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopRightDialog;
