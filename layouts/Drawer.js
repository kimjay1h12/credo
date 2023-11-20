import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SellIcon from "@mui/icons-material/Sell";
import { Avatar, ButtonBase, TextField } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
const drawerWidth = 240;
const routes = [
  {
    label: "Home",
    path: "/",
    icon: <AppsIcon />,
    active: "home",
  },
  {
    label: "My Orders",
    path: "/dashboard/orders",
    icon: <AddBoxIcon />,
    active: "orders",
  },
  {
    label: "Product",
    path: "/dashboard/products",
    icon: <MoreHorizIcon />,
    active: "product",
  },
  {
    label: "Category",
    path: "/dashboard/category",
    icon: <PersonIcon />,
    active: "category",
  },
  {
    label: "Customers",
    path: "/dashboard/customers",
    icon: <SellIcon />,
    active: "customer",
  },
  {
    label: "Collections",
    path: "/dashboard/collections",
    icon: <AnalyticsIcon />,
    active: "collections",
  },
  {
    label: "Analytic",
    path: "/dashboard/analytics",
    icon: <DashboardIcon />,
    active: "analytic",
  },
  {
    label: "Store Setting",
    path: "/",
    icon: <SettingsIcon />,
    active: "settings",
  },

  // {
  //   label: "Marketing",
  //   path: "/",
  //   icon: <CampaignIcon />,
  // },
];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  background: "#fff",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children, active }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", boxShadow: 0 }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: "#fff",
          boxShadow: 1,
          color: "#000",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <TextField
            placeholder="Search"
            size="small"
            sx={{ background: "#F1F1F1" }}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <ButtonBase
              sx={{ background: "#f1f1f1", borderRadius: 30, padding: 1 }}
            >
              <NotificationsNoneIcon />
            </ButtonBase>
            <Avatar />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" fontWeight={700}>
                John Doe
              </Typography>
              <Typography variant="caption">Olawaleadeit@gmail.com</Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer sx={{ boxShadow: 1 }} variant="permanent" open={open}>
        <DrawerHeader>
          <img
            src={"/img/logo.png"}
            style={{
              height: 40,
              width: 100,
              objectFit: "contain",
              position: "absolute",
              left: 10,
            }}
          />

          <IconButton
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ marginLeft: 2, marginRight: 2 }} />
        <Typography mt={3} variant="caption" ml={2.8} color={"#B2B8BD"}>
          MAIN MENU
        </Typography>
        <List>
          {routes.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  router.push(text.path);
                }}
                sx={{
                  backgroundColor: active === text.active && "#EFF6FF",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  marginBottom: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, background: "#EFF6FF", minHeight: "100vh" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
