import { makeStyles } from "@mui/styles";
import React from "react";
import MainLayout from "../../layouts/Mainlayouts";
import {
  Button,
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductsItem from "../../components/Products/ProductsItem";
const useStyles = makeStyles({
  root: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    marginBottom: 30,
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
  },
  center: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  button: {
    height: 40,
    width: 50,
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 0.5,
    borderStyle: "solid",
  },
});
function Index() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <MainLayout route={"category"}>
      <div className={classes.root}>
        <Typography variant="h5" fontWeight={700}>
          Category
        </Typography>
        <div className={classes.row}>
          <ButtonBase
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography>Price, high to low</Typography>
            <KeyboardArrowDownIcon />
          </ButtonBase>
          <div>
            <ButtonBase
              style={{
                height: 40,
                width: 50,
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#000",
                borderWidth: 0.5,
                borderStyle: "solid",
              }}
            >
              <Typography>USD</Typography>
              {/* <KeyboardArrowDownIcon /> */}
            </ButtonBase>
            <ButtonBase
              style={{
                height: 40,
                width: 50,
                display: "flex",
                // flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#000",
                borderWidth: 0.5,
                borderStyle: "solid",
                background: "#000",
                color: "#fff",
              }}
            >
              <Typography>NGN</Typography>
              {/* <KeyboardArrowDownIcon /> */}
            </ButtonBase>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>2000</MenuItem>
            <MenuItem onClick={handleClose}>4000</MenuItem>
            <MenuItem onClick={handleClose}>6000</MenuItem>
          </Menu>
        </div>
        <div>
          <div className={classes.wrapper}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((cur) => (
                <Grid item key={cur} sm={6} xs={6} md={3}>
                  <ProductsItem url />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={classes.center}>
            <Button variant="outlined">View More</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
