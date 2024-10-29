import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  Box,
  Divider,
  Paper,
  useTheme,
  Grid
} from "@mui/material";
import { RouteType } from "@/client/routes";
import { useAppContext } from "@/client/context";
import { setSidenavMini } from "@/client/context";

interface SideNavigationProps {
  routes: RouteType[];
}

const SideNavigation: React.FC<SideNavigationProps> = ({ routes }) => {
  const location = useLocation();
  const [appData, dispatch] = useAppContext();
  const {
    sidenav: { mini: miniSidenav }
  } = appData;
  const theme = useTheme();

  const handleSidenavToggle = () => setSidenavMini(dispatch, !miniSidenav);

  return (
    <Grid
      item
      xs={2}
      sm={miniSidenav ? 1 : 2}
    >
      <Drawer
        variant="permanent"
        sx={{
          "width": miniSidenav ? 80 : 160,
          "& .MuiDrawer-paper": {
            width: miniSidenav ? 80 : 160,
            position: "relative",
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          }
        }}
      >
        <Paper
          elevation={4}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Sidebar Toggle Button */}
          <Box
            display="flex"
            justifyContent="center"
            p={1}
          >
            <IconButton onClick={handleSidenavToggle}>
              <Icon>{miniSidenav ? "chevron_right" : "chevron_left"}</Icon>
            </IconButton>
          </Box>
          <Divider />

          {/* Sidebar Links */}
          <List>
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
                      button
                      sx={{
                        "backgroundColor": isActive
                          ? "primary.main"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: "primary.light"
                        },
                        "color": isActive
                          ? "primary.contrastText"
                          : "text.secondary",
                        "borderRadius": 1,
                        "mb": 1,
                        "mx": 1, // Add horizontal margin for spacing
                        "transition": theme.transitions.create(
                          "background-color",
                          {
                            duration: theme.transitions.duration.short
                          }
                        )
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive
                            ? "primary.contrastText"
                            : "text.secondary",
                          minWidth: "40px" // To maintain spacing even when mini
                        }}
                      >
                        <Icon>{icon}</Icon>
                      </ListItemIcon>
                      {!miniSidenav && <ListItemText primary={name} />}
                    </ListItem>
                  </NavLink>
                );
              })}
          </List>
        </Paper>
      </Drawer>
    </Grid>
  );
};

export default SideNavigation;
