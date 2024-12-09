import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  styled,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
} from "@mui/material";

import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


import Logouts from "../pages/Logouts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import AddDoctor from "../pages/AddDoctor";
import AddPharma from "../pages/AddPharma";
import AddLab from "../pages/AddLab";
import ShowDoctors from "../pages/ShowDoctors";
import Showpharma from "../pages/Showpharma";
import ShowLab from "../pages/ShowLab";
import Profile from "../pages/Profile";
import AddRegistration from "../pages/AddRegistration";
import ShowRegistration from "../pages/ShowRegistration";
import AdminDashboard from "./AdminDashboard";



const AdminDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const drawerWidth = 240;

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
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute">
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Drawer variant="permanent" open={open}>
              <React.Fragment>
                <ListItemButton component={Link} to="/" title="Home">
                  <ListItemIcon>
                    <HomeIcon
                      color={
                        location.pathname === "/Adminhome" ||
                        location.pathname === "/"
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addRegistration" title="Add Registration">
                  <ListItemIcon>
                    <AppRegistrationIcon
                      style={{ fontWeight: "bolder", fontSize: "23px" }}
                      color={
                        location.pathname.startsWith("/addRegistration")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="add Registration" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addDoctor" title=" Add Doctor">
                  <ListItemIcon>
                    <MedicationIcon
                      style={{ fontWeight: "bolder", fontSize: "23px" }}
                      color={
                        location.pathname.startsWith("/addDoctor")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="add Doctor" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addPharmacist" title="">
                  <ListItemIcon>
                    <LocalPharmacyIcon
                      style={{ fontWeight: "bolder", fontSize: "23px" }}
                      color={
                        location.pathname.startsWith("/addPharmacist")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="add Pharmacist" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addLabTechnican" title="Add Lab Technicial">
                  <ListItemIcon>
                    <PersonOutlineIcon
                      color={
                        location.pathname.startsWith("/addLabTechnician")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add LabTechnician" />
                </ListItemButton>
                <ListItemButton component={Link} to="/ShowRegistration" title="Show Registration">
                  <ListItemIcon>
                    <ViewTimelineIcon
                      color={
                        location.pathname.startsWith("/ShowRegistration")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Show Registration" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showDoctor" title="Show Doctor">
                  <ListItemIcon>
                    <ViewTimelineIcon
                      color={
                        location.pathname.startsWith("/showDoctor")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="show Doctor" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showPharmacist" title="Show Pharmacist">
                  <ListItemIcon>
                    <ViewTimelineIcon
                      color={
                        location.pathname.startsWith("/showPharmacist")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="showPharmacist" title="Show Lab Technician" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showLabTechnicial">
                  <ListItemIcon>
                    <ViewTimelineIcon
                      color={
                        location.pathname.startsWith("/showLabTechnicial")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="showLabTechnical" />
                </ListItemButton>
              </React.Fragment>
              <Divider sx={{ my: 1 }} />
              <React.Fragment>
                <ListSubheader component="div" inset>
                  User
                </ListSubheader>
                <ListItemButton component={Link} to="/adminprofile" title="Profile">
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon
                      color={
                        location.pathname.startsWith("/adminprofile")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminlogout" title="Logout">
                  <ListItemIcon>
                    <ExitToAppIcon
                      color={
                        location.pathname.startsWith("/adminlogout")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Logouts" />
                </ListItemButton>
              </React.Fragment>
            </Drawer>
          </List>
        </Drawer>

        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            {/* <Route path="/" element={<AdminHome />} /> */}
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/Adminhome" element={<AdminDashboard />} />
            <Route path="/addDoctor" element={<AddDoctor/>} />
            <Route path="/addPharmacist" element={<AddPharma />} />
            <Route path="/addLabTechnican" element={<AddLab />} />
            <Route path="/showDoctor" element={<ShowDoctors />} />
            <Route path="/showPharmacist" element={<Showpharma />} />
            <Route path="/showLabTechnicial" element={<ShowLab />} />
            <Route path="/adminprofile" element={<Profile />} />
            <Route path="/addRegistration" element={<AddRegistration />} />
            <Route path="/ShowRegistration" element={<ShowRegistration />} />
            <Route path="/adminlogout" element={<Logouts />} />
            <Route path="*" element={<Navigate to="/Adminhome" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default AdminDrawer;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};