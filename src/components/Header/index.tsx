import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Menu,
  Typography,
  IconButton,
  MenuItem,
  AppBar,
  Toolbar,
  Grid,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { RouteType } from "@/client/routes";
import { useAppContext } from "@/context";
import logo from "@/client/assets/images/llminaboxlogo.png";

interface HeaderProps {
  routes: RouteType[];
}

const Header: React.FC<HeaderProps> = ({ routes }) => {
  const [mobileNavbar, setMobileNavbar] = useState<null | HTMLElement>(null);
  const [appData, { setTheme }] = useAppContext();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleMobileToggle = (event: React.MouseEvent<HTMLElement>) => {
    setMobileNavbar(mobileNavbar ? null : event.currentTarget);
  };

  const handleThemeToggle = () => {
    const nextTheme = appData.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const renderNavbarLinks = () => {
    return routes
      .filter(
        (route) => !route.sidebar && route.route !== "*" && route.route !== "/"
      )
      .map(({ name, route, icon }) => {
        const isActive = location.pathname === route;

        return isMobile ? (
          <MenuItem
            key={name}
            component={Link}
            to={route}
            onClick={() => setMobileNavbar(null)}
            sx={{ justifyContent: "flex-start" }}
          >
            {icon}
            <Typography
              variant="body1"
              sx={{ ml: 1 }}
            >
              {name}
            </Typography>
          </MenuItem>
        ) : (
          <Button
            key={name}
            component={Link}
            to={route}
            variant={isActive ? "contained" : "text"}
            color={isActive ? "primary" : "inherit"}
            startIcon={icon}
            sx={{ padding: 1, margin: 1 }}
          >
            <Typography
              variant="button"
              color="inherit"
            >
              {name}
            </Typography>
          </Button>
        );
      });
  };

  return (
    <Grid
      item
      xs={12}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Brand Logo */}
          <IconButton
            component={Link}
            to="/"
            sx={{ borderRadius: 1, padding: 1 }}
          >
            <img
              src={logo as string}
              alt="Brand Logo"
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginLeft: theme.spacing(1) }}
            >
              LLMINABOX
            </Typography>
          </IconButton>

          {/* Navbar Links (Visible on large screens) */}
          <Box
            sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
          >
            {renderNavbarLinks()}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* Theme Toggle Icon */}
            <IconButton
              onClick={handleThemeToggle}
              sx={{ borderRadius: 1 }}
            >
              {appData.theme === "light" ? (
                <Brightness7Icon />
              ) : (
                <Brightness2Icon />
              )}
            </IconButton>

            {/* Mobile Navbar Toggle */}
            <IconButton
              onClick={handleMobileToggle}
              sx={{ display: { xs: "block", lg: "none" }, borderRadius: 1 }}
            >
              {mobileNavbar ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Navbar Menu */}
        <Menu
          anchorEl={mobileNavbar}
          open={Boolean(mobileNavbar)}
          onClose={handleMobileToggle}
        >
          {renderNavbarLinks()}
        </Menu>
      </AppBar>
    </Grid>
  );
};

export default Header;
