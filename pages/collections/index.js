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
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductsItem from "../../components/Products/ProductsItem";
import { useEffect } from "react";
import { useState } from "react";
import client from "../../api/client";
import { useContext } from "react";
import { GlobalContext } from "../../context";
const useStyles = makeStyles({
  root: {},
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
  header: {
    color: "#fff",
    paddingTop: 30,

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: 15,
    minHeight: "70vh",
    ["@media (min-width : 1200px)"]: {
      padding: 50,
      margin: 0,
      minHeight: "70vh",

      backgroundImage: `url("/img/collectionbg.png")`,
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  content: {
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 70,
    },
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
  headerImage: {
    width: "40%",
    height: "500px",
    objectFit: "contain",
  },
});
function Index() {
  const {
    collectionsState: { data },
  } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  // const classes = useStyles();
  const FetchProductByCategory = async (id = data[0]?.id) => {
    setLoading(true);
    if (id)
      try {
        const res = (
          await client.get(`/api/v1/Product/getProductsByCollection/${id}`)
        ).data;
        console.log("products", res);
        setProducts(res.data);
      } catch (error) {
        console.log("error fetchin product by id", error.response);
      }
    setLoading(false);
  };
  useEffect(() => {
    if (id === "") {
      FetchProductByCategory();
    } else {
      FetchProductByCategory(id);
    }
  }, [id]);

  const classes = useStyles();
  return (
    <MainLayout route={"collections"}>
      <div className={classes.root}>
        {data.length > 0 && (
          <div
            className={classes.header}
            style={{
              backgroundImage: `url(${
                [...data]?.find((item) => item.id === (id === "" ? 5 : id))
                  ?.image
              })`,
            }}
          >
            <div className={classes.row}>
              <TextField
                value={id === "" ? data[0]?.id : id}
                size="small"
                select
                sx={{ minWidth: 200, background: "#f7f7f7" }}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {data.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
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
                <MenuItem onClick={handleClose}>2000</MenuItem>
                <MenuItem onClick={handleClose}>4000</MenuItem>
                <MenuItem onClick={handleClose}>6000</MenuItem>
              </Menu>
            </div>
            {/* <Hidden smDown>
            <img src="/img/c1.png" className={classes.headerImage} />
          </Hidden> */}
          </div>
        )}
        <div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Grid container spacing={2}>
                {products.map((cur) => (
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
      </div>
    </MainLayout>
  );
}

export default Index;
