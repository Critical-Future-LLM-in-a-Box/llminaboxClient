import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  List,
  Divider,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
  IconButton,
  Fab
} from "@mui/material";
import { useAppContext } from "@/client/context";
import { setSidenavHidden, setSidenavMini } from "@/client/context/actions";
import { RouteType } from "@/client/routes";

interface SideNavbarProps {
  routes: RouteType[];
}

const Sidebar: React.FC<SideNavbarProps> = ({ routes }) => {
  const [appData, dispatch] = useAppContext();
  const {
    sidenav: { mini: miniSidenav, hidden: hiddenSidenav }
  } = appData;

  const location = useLocation();

  // Toggle between mini and full sidebar
  const handleSidenavToggle = () => {
    setSidenavMini(dispatch, !miniSidenav);
  };

  // Close sidebar on small screens
  const handleCloseSidenav = () => {
    setSidenavHidden(dispatch, true);
  };

  // Show sidebar on small screens
  const handleShowSidenav = () => {
    setSidenavHidden(dispatch, false);
  };

  // Manage screen resize to toggle between mini/full and hidden
  useEffect(() => {
    const handleResize = () => {
      const isTabletView = window.innerWidth <= 1200;
      const isMobileView = window.innerWidth <= 768;
      setSidenavMini(dispatch, isTabletView);
      setSidenavHidden(dispatch, isMobileView);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to check screen size
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Render navigation links
  const renderRoutes = routes
    .filter((route) => route.sidebar)
    .map(({ name, route, icon }, index) => {
      const isActive = location.pathname === route;

      return (
        <NavLink
          key={index}
          to={route!}
        >
          <ListItem
            sx={(theme) => ({
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "center",
              "backgroundColor": isActive
                ? theme.palette.primary.main
                : "transparent",
              "color": isActive
                ? theme.palette.primary.contrastText
                : theme.palette.text.secondary,
              "padding": theme.spacing(1, 2),
              "margin": theme.spacing(0.5, 2),
              "borderRadius": theme.shape.borderRadius,
              "&:hover": {
                backgroundColor: theme.palette.action.hover
              }
            })}
          >
            <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>
              {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
            </ListItemIcon>
            {!miniSidenav && (
              <ListItemText
                primary={name}
                primaryTypographyProps={{
                  variant: "subtitle2",
                  fontWeight: "medium"
                }}
              />
            )}
          </ListItem>
        </NavLink>
      );
    });

  return (
    <>
      {!hiddenSidenav && (
        <Drawer
          variant="permanent"
          sx={(theme) => ({
            "& .MuiDrawer-paper": {
              overflow: "hidden",
              marginTop: theme.spacing(12),
              width: miniSidenav ? theme.spacing(10) : 250,
              height: "88%",
              transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter
              }),
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              boxShadow: theme.shadows[3]
            }
          })}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <IconButton
                sx={{ display: { xs: "block", md: "none" } }}
                onClick={handleCloseSidenav}
              >
                <Icon>close</Icon>
              </IconButton>
              <IconButton onClick={handleSidenavToggle}>
                <Icon>{miniSidenav ? "chevron_right" : "chevron_left"}</Icon>
              </IconButton>
            </Box>

            <Divider />

            <List>{renderRoutes}</List>
          </Box>
        </Drawer>
      )}

      {hiddenSidenav && (
        <Fab
          color="primary"
          aria-label="menu"
          onClick={handleShowSidenav}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 999
          }}
        >
          <Icon>menu</Icon>
        </Fab>
      )}
    </>
  );
};

export default Sidebar;
