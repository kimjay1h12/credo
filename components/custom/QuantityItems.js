import React from "react";
import { ButtonBase, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import { CARTQUANTITYPROPS } from "../../src/types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonBase: {
    height: 40,
    width: 40,
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 0.5,
    borderStyle: "solid",
  },
  center: {
    height: 40,
    width: 40,
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 0.5,
    borderStyle: "solid",
  },
}));

const CartQuantityButton = ({
  quantity = 0,
  handleChange,
  size = "medium",
  max,
}) => {
  const classes = useStyles({ size });

  const handleDecrement = () => {
    if (quantity > 1) {
      handleChange(quantity - 1);
    }
  };

  return (
    <div className={classes.root}>
      <ButtonBase className={classes.buttonBase} onClick={handleDecrement}>
        <RemoveIcon />
      </ButtonBase>
      <div className={classes.center}>
        <Typography>{quantity}</Typography>
      </div>
      <ButtonBase
        className={classes.buttonBase}
        disabled={quantity === max}
        onClick={() => handleChange(quantity + 1)}
      >
        <AddIcon />
      </ButtonBase>
    </div>
  );
};

export default CartQuantityButton;
