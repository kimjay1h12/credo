import CloseIcon from "@mui/icons-material/Close";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/icons-material/Menu";
import {
  AppBar,
  Backdrop,
  Button,
  ButtonBase,
  Grow,
  Hidden,
  IconButton,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useRouter } from "next/router";
import { useState } from "react";
import TopRightDialog from "./Cart/CartView";
// import SignUp from "./Section/SignUp";

const useStyles = makeStyles({
  toolbar: {
    background: "#fff",
    color: "#000",
    padding: "5px 20px",

    justifyContent: "space-between",
    ["@media (min-width : 1200px)"]: {
      padding: "0px 2vw",
    },
    "& ul": {
      listStyle: "none",
      display: "flex",
      margin: 0,
      alignItems: "center",
      "& a": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px 15px",
        textTransform: "capitalize",
        color: "#000",
        fontSize: 13,
        cursor: "pointer",
        textDecoration: "none",

        "&:hover ,&.active": {
          color: "green",
        },
      },
    },
  },

  logo: {
    height: 40,
    objectFit: "contain",
    // marginRight: 40,
    display: "flex",
    justifyContent: "center",
    transition: "all 0.3s",
  },
  drawer: {
    zIndex: 1500,
    background: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    padding: 10,
    paddingTop: 10,
    width: "100vw",

    "& ul": {
      display: "flex",
      listStyle: "none",
      padding: 0,
      flexDirection: "column",
      "& a": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
        padding: 15,
      },
      "& .css-i4bv87-MuiSvgIcon-root": {
        color: "inherit",
      },
      "& li ": {
        "& span": {
          paddingLeft: 15,
        },
        "& a:hover , & a:active , & a.active": {
          background: "#f902",
          color: "#cea666",
          fontWeight: 700,
        },
      },
    },
  },

  metric: {
    padding: 5,
    borderRadius: 20,
    background: "#fff",
    display: "flex",

    "& span": {
      display: "flex",
      padding: "5px 30px",
      borderRadius: 20,

      "&.active": {
        color: "#fff",
        background: "#fff",
      },
    },
  },
});

function AppToolbar({ route, children, background, opencart = false }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState();
  const [openCartDialog, setOpenCartDialog] = useState(opencart);
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const login = "/login";
  const routes = [
    {
      href: "/",
      active: route === "home",

      label: "Home",
    },

    {
      href: "/shop",

      active: route === "shop",
      label: "Shop",
    },
    {
      href: "/collections",

      active: route === "collections",
      label: "Collections",
    },

    {
      href: "/category",
      active: route === "category",
      label: "Category",
    },
  ];

  const Drawer = (
    <div className={classes.drawer}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0vh 3.5vw",
        }}
      >
        <img
          style={{ marginBottom: 20 }}
          className={classes.logo}
          src="/img/logo.png"
        />
        <ButtonBase
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <CloseIcon sx={{ marginBottom: 3 }} />
        </ButtonBase>
      </div>
      <ul>
        {routes.map((cur) => (
          <li key={cur.label}>
            <a
              onClick={() => router.push(cur.href)}
              className={cur.active ? "active" : ""}
            >
              {cur.icon}
              <span>{cur.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <AppBar
      color="transparent"
      style={{
        background: "#fff",
        boxShadow: "0 5px 20px #0001",
      }}
      position="sticky"
    >
      <TopRightDialog
        open={openCartDialog}
        onClose={() => {
          setOpenCartDialog(false);
        }}
      />
      <Hidden lgUp>
        <Backdrop open={menuOpen} onClick={() => setMenuOpen(false)} />
        <Grow in={menuOpen}>{Drawer}</Grow>
      </Hidden>
      <Toolbar className={classes.toolbar}>
        <Hidden smDown>
          <div>
            <ul>
              {routes.map((cur) => (
                <li key={cur.href}>
                  <a
                    onClick={() => router.push(cur.href)}
                    className={cur.active ? "active" : ""}
                  >
                    {cur.icon}
                    <span>{cur.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Hidden>
        <div>
          <Hidden smUp>
            <IconButton
              sx={{ marginLeft: "-10%", color: "#000" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseOutlined /> : <Menu />}
            </IconButton>
          </Hidden>
        </div>{" "}
        <Hidden smDown>
          <div style={{ width: "30%" }}>
            <img className={classes.logo} src="/img/logo2.png" />
          </div>
        </Hidden>
        <Hidden smUp>
          <div>
            <img className={classes.logo} src="/img/logo2.png" />
          </div>
        </Hidden>
        <Hidden smDown>
          <div>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginRight: 5,
                gap: 20,
                "& .cart:hover": {
                  color: "#fff",
                },
              }}
            >
              <SearchIcon />
              <PersonIcon />
              <ShoppingBagIcon
                onClick={() => {
                  setOpenCartDialog(true);
                }}
              />
            </Box>
          </div>
        </Hidden>
        <Hidden smUp>
          <div>
            <ShoppingBagIcon
              onClick={() => {
                setOpenCartDialog(true);
              }}
            />
          </div>
        </Hidden>
      </Toolbar>

      {/* <Footer /> */}
    </AppBar>
  );
}

// const UserProfileNavigator = ({ router }) => {
//   const classes = useStyles();
//   const [isVisible, setIsVisible] = useState(false);
//   const handleClose = () => {
//     setIsVisible(false);
//   };
//   const handleOpen = () => {
//     setIsVisible(true);
//   };

//   return (

//   );
// };

export default AppToolbar;
