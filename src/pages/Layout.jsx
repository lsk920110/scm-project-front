import {
  Category,
  Group,
  Handshake,
  Inventory,
  Kitchen,
  ListAlt,
  LocalShipping,
  PointOfSale,
  Toc,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { menuList } from "../const/menuList";
import service from "../utils/requestAxios";

const drawerWidth = 240;

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

// const menuList = [
//   // { path: "menu/management", title: "메뉴관리", icon: <Menu /> },
//   { path: "member/management", title: "직원관리", icon: <Group /> },
//   { path: "vendor/management", title: "거래선관리", icon: <Handshake /> },
//   { path: "category/management", title: "카테고리관리", icon: <Category /> },
//   {
//     path: "productCord/management",
//     title: "상품코드관리",
//     icon: <Inventory />,
//   },
//   { path: "model/management", title: "모델관리", icon: <Kitchen /> },
//   { path: "order/registration", title: "발주등록", icon: <ListAlt /> },
//   { path: "order/management", title: "주문관리", icon: <Toc /> },
//   { path: "sales/management", title: "매출관리", icon: <PointOfSale /> },
//   { path: "shipping/management", title: "배송조회", icon: <LocalShipping /> },
// ];

function Layout({ nowSection, setNowSetcion }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("제목부분");
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"white"}
            width={"60%"}
          >
            {nowSection}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"white"}
            width={"30%"}
          >
            {localStorage.getItem("loginMemberName")} 님 환영합니다.
          </Typography>
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={() => {
              service
                .post(`/api/member/logout`, {
                  id: localStorage.getItem("loginMemberId"),
                })
                .then((res) => {
                  const { errorCode, errorMessage, result } = res.data;
                  if (errorCode === "0000") {
                    alert("로그아웃 되었습니다.");
                    navigate("/login");
                  } else {
                    alert(errorMessage);
                  }
                });
            }}
          >
            LOGOUT
          </Button>

          {/* <Button variant="text">
            </Button> */}
          {/* <Box display={'flex'} justifyContent={'space-around'} width={'100%'}>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {menuList.map((item, index) => (
            <Link to={item.path} style={{textDecoration : 'none' , color : 'rgba(0,0,0,0.87)'}}>
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    // navigate(item.path);
                    setTitle(item.title);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      // color : 'red'
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

export default Layout;
