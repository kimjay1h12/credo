import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  Hidden,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext } from "react";
// import { GlobalContext } from "../context";
// import { logoutHandler } from "../context/actions/auth";
const drawerWidth = 220;
const routes = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    active: "dashboard",
  },
  {
    label: "Management",
    path: "/",
    icon: <ManageAccountsIcon />,
    active: "management",
  },
  {
    label: "Drivers",
    path: "/drivers",
    icon: <PersonIcon />,
    active: "drivers",
  },
  // {
  //   label: "Customers Support",
  //   path: "/customersupport",
  //   icon: <HeadsetMicIcon />,
  //   active: "",
  // },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <LeaderboardIcon />,
    active: "analytics",
  },
  // {
  //   label: "Marketing",
  //   path: "/",
  //   icon: <CampaignIcon />,
  // },
  {
    label: "Withdraw",
    path: "/withdraw",
    active: "withdraw",
    icon: <MonetizationOnIcon />,
  },
];
const logo = "/img/logo.png";
const management = [
  {
    label: "User management",
    path: "/management/users",

    active: "users",
  },
  {
    label: "Payment management",
    path: "/management/payment",

    active: "payment",
  },
  {
    label: "Price management",
    path: "/management/pricing",

    active: "price",
  },
];
function DashBoardLayout({ children, route, mroute, loading }) {
  //   const { authDispatch, authState } = useContext(GlobalContext);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // React?.useEffect(() => {
  //   if (!authState?.loggedIn) {
  //     router.push("/login");
  //   }
  // }, [authState?.loggedIn]);

  const drawer = (
    <div>
      {loading && (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            color: "#000",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            zIndex: 2000,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Hidden smUp>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            padding: 10,
          }}
        >
          <div>
            {" "}
            <img
              src={logo}
              style={{ height: 20, width: 50, objectFit: "contain" }}
            />
          </div>
          {/* <Typography>Admin console</Typography> */}
          <IconButton
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <CloseIcon style={{ fontSize: 30, color: "#000" }} />
          </IconButton>
        </div>
      </Hidden>
      <Hidden smDown>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // minHeight: 100,
            height: 60,
            padding: 10,
            flexDirection: "column",
            color: "#000",
          }}
        >
          <img src={logo} style={{ height: 50, objectFit: "contain" }} />
          {/* <img src={logo} style={{ height: 30, objectFit: "contain" }} /> */}
          <div style={{ background: "#000", width: "100%", height: 0.5 }} />
          {/* <Typography>ghjkl;'kljhgfd</Typography> */}
          {/* <Typography>Admin console</Typography> */}
        </div>
      </Hidden>

      <List>
        <Typography color={"#000"}>Main Menu</Typography>
        {routes.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              color: "#000",
              marginBottom: 2,
              background: item.active === route ? "#8B2CF5" : "",
            }}
          >
            {item.active === "management" ? (
              <div style={{ width: "100%" }}>
                <ListItemButton
                  onClick={() => {
                    setAnchorEl(!anchorEl);
                  }}
                >
                  <ListItemIcon sx={{ color: "#000" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                  <IconButton>
                    {open ? (
                      <KeyboardArrowUpIcon sx={{ color: "#000" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ color: "#000" }} />
                    )}
                  </IconButton>
                </ListItemButton>
                {open && (
                  <Box
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    TransitionComponent={Fade}
                  >
                    {management.map((item, i) => (
                      <ListItemButton
                        sx={{
                          background: item.active === mroute ? "#aaa" : "",
                        }}
                        onClick={() => {
                          setAnchorEl(!anchorEl);
                          router.push(item.path);
                        }}
                        key={i}
                      >
                        <ListItemIcon sx={{ color: "#000" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </Box>
                )}
              </div>
            ) : (
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                }}
              >
                <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          right: 0,
          padding: 20,
        }}
      >
        <Button
          color="secondary"
          sx={{ color: "#000" }}
          variant="contained"
          fullWidth
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "var(--primary)",

              color: "white",
            },
          }}
          // sx={{
          //   display: { xs: "none", sm: "block" },
          //   "& .MuiDrawer-paper": {
          //     width: drawerWidth,
          //     border: "none",
          //     background: "var(--primary)",

          //     color: "white",
          //   },
          // }}
          open
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          sx={{
            display: { md: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: "90%",
              border: "none",
              background: "var(--primary)",

              color: "white",
            },
          }}
          open={mobileOpen}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width: `calc(100% - ${drawerWidth})`,
        }}
      >
        <Hidden mdUp>
          <Toolbar
            sx={{
              background: "var(--primary)",
              height: 70,
              position: "fixed",
              width: "100%",
              zIndex: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#000",
                width: "100%",
              }}
            >
              <div>
                {" "}
                <img src={logo} style={{ height: 50, objectFit: "contain" }} />
              </div>
              <Typography>Admin console</Typography>
              <IconButton
                onClick={() => {
                  setMobileOpen(true);
                }}
              >
                <MenuIcon style={{ fontSize: 30, color: "#000" }} />
              </IconButton>
            </div>
          </Toolbar>
        </Hidden>
        <Hidden smUp>
          <Box style={{ background: "#EFF6FF", minHeight: "100vh" }} mt={9}>
            {children}
          </Box>
        </Hidden>
        <Hidden smDown>
          <Paper
            sx={{
              boxSizing: "border-box",
              background: "var(--primary)",

              color: "white",
              borderRadius: 0,
              height: 50,
              //   marginLeft: "-10%",
            }}
          >
            <Typography>ghjk</Typography>
          </Paper>
          <Box style={{ background: "#EFF6FF", minHeight: "100vh" }}>
            {children}
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
}

export default DashBoardLayout;
