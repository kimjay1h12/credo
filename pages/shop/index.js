import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
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
import { GlobalContext } from "../../context";
import client from "../../api/client";
const useStyles = makeStyles({
  root: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 70,
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
  const {
    // productState: { data },
  } = useContext(GlobalContext);
  const [page, setPage] = useState(15);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getAllUserProducts = async (query = "price.asc") => {
    // dispatch({
    //   type: "LOADING",
    // });
    try {
      const p = (
        await client.get(
          `/api/v1/Product/getAllProducts?pageSize=10000&${query}`
        )
      ).data;
      console.log(p.data);
      setData(p.data);
      // dispatch({
      //   type: "FETCHED_DATA",
      //   payload: p.data,
      // });
      // console.log("products", p.data);
    } catch (error) {
      // dispatch({
      //   type: "ERROR",
      //   payload: error.response?.data?.message || "Couldn't get cart",
      // });
      console.log("Error all products", error.response);
    }
  };
  useEffect(() => {
    getAllUserProducts();
  }, []);

  const classes = useStyles();
  return (
    <MainLayout route={"shop"}>
      <div className={classes.root}>
        <Typography variant="h5" fontWeight={700}>
          Shop
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
            <MenuItem onClick={handleClose}>High</MenuItem>
            <MenuItem onClick={handleClose}>Low</MenuItem>
            {/* <MenuItem onClick={handleClose}>6000</MenuItem> */}
          </Menu>
        </div>
        <div>
          <div className={classes.wrapper}>
            <Grid container spacing={{ xs: 2, md: 6 }}>
              {data.map((cur) => (
                <Grid item key={cur} sm={6} xs={6} md={2.4}>
                  <ProductsItem {...cur} />
                </Grid>
              ))}
            </Grid>
          </div>
          {/* <div className={classes.center}>
            <Button variant="outlined">View More</Button>
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
