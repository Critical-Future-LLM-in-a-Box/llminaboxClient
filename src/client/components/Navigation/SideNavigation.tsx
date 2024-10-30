import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { RouteType } from "@/client/routes";
import { useAppContext } from "@/client/context";

interface SideNavigationProps {
  routes: RouteType[];
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ routes }) => {
  const location = useLocation();
  const [appData, { setSidenavMini }] = useAppContext();
  const {
    sidenav: { mini: miniSidenav }
  } = appData;

  const handleSidenavToggle = () => setSidenavMini(!miniSidenav);

  return (
    <Drawer
      variant="permanent"
      sx={{
        "height": "100%",
        "width": "100%",
        "& .MuiDrawer-paper": {
          position: "relative"
        }
      }}
    >
      {/* Sidebar Toggle Button */}
      <Box
        display="flex"
        justifyContent="center"
      >
        <IconButton onClick={handleSidenavToggle}>
          {miniSidenav ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />

      {/* Sidebar Links */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: "5px"
        }}
      >
        {routes
          .filter((route) => route.sidebar)
          .map(({ name, route, icon }, index) => {
            const isActive = location.pathname === route;

            return (
              <NavLink
                key={index}
                to={route}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  sx={{
                    "backgroundColor": isActive
                      ? "primary.main"
                      : "transparent",
                    "&:hover": { backgroundColor: "primary.light" },
                    "color": isActive
                      ? "primary.contrastText"
                      : "text.secondary"
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive
                        ? "primary.contrastText"
                        : "text.secondary"
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {!miniSidenav && <ListItemText primary={name} />}
                </ListItem>
              </NavLink>
            );
          })}
      </List>
    </Drawer>
  );
};

export default SideNavigation;
