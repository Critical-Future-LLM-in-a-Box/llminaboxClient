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
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "@/client/context";
import { setSidenavHidden, setSidenavMini } from "@/client/context/actions";
import { RouteType } from "@/client/routes";

interface SideNavbarProps {
  routes: RouteType[];
}

const Sidebar: React.FC<SideNavbarProps> = ({ routes }) => {
  const theme = useTheme(); // Access theme
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
            sx={{
              "display": "flex",
              "alignItems": "center",
              "justifyContent": miniSidenav ? "center" : "start",
              "backgroundColor": isActive
                ? theme.palette.primary.main
                : theme.palette.background.paper,
              "color": isActive
                ? theme.palette.primary.contrastText
                : theme.palette.text.secondary,
              "borderRadius": theme.shape.borderRadius,
              "&:hover": {
                backgroundColor: isActive
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover
              }
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: miniSidenav ? theme.spacing(10) : 50,
                color: isActive ? theme.palette.common.white : "inherit"
              }}
            >
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
          sx={{
            "& .MuiDrawer-paper": {
              overflow: "hidden",
              marginTop: theme.spacing(10), // Accounts for the header height
              width: miniSidenav ? theme.spacing(10) : 250,
              height: "calc(100% - 80px)",
              transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter
              }),
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              boxShadow: theme.shadows[3],
              backgroundColor: theme.palette.background.default
            }
          }}
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

            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: theme.spacing(1)
              }}
            >
              {renderRoutes}
            </List>
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
