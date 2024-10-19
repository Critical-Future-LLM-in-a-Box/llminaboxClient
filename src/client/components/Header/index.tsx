import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Icon,
  Menu,
  Box,
  Typography,
  IconButton,
  MenuItem
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RouteType } from "@/client/routes";
import { useAppContext } from "@/client/context";
import { setTheme } from "@/client/context/actions";
import logo from "@/client/assets/images/llminaboxlogo.png";

interface HeaderProps {
  routes: RouteType[];
}

const Header: React.FC<HeaderProps> = ({ routes }) => {
  const [mobileNavbar, setMobileNavbar] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const theme = useTheme();
  const [appData, dispatch] = useAppContext();

  const handleMobileToggle = (event: React.MouseEvent<HTMLElement>) => {
    setMobileNavbar(mobileNavbar ? null : event.currentTarget);
  };

  const handleThemeToggle = () => {
    const nextTheme =
      appData.theme === "light"
        ? "dark"
        : appData.theme === "dark"
          ? "llminabox"
          : "light";
    setTheme(dispatch, nextTheme);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(dispatch, themeName);
    handleMenuClose();
  };

  const renderNavbarLinks = () => {
    return routes
      .filter(
        (route) => !route.sidebar && route.route !== "*" && route.route !== "/"
      )
      .map(({ name, route, icon }) => {
        const isActive = location.pathname === route;
        return (
          <Box
            key={name}
            component={Link}
            to={route}
            display="flex"
            alignItems="center"
            p={1}
            mx={1}
            sx={{
              "backgroundColor": isActive
                ? theme.palette.primary.main
                : "transparent",
              "color": isActive
                ? theme.palette.primary.contrastText
                : theme.palette.text.secondary,
              "borderRadius": 1,
              "textDecoration": "none",
              "&:hover": { backgroundColor: theme.palette.primary.light }
            }}
          >
            <Icon>{typeof icon === "string" ? icon : icon.props.children}</Icon>
            <Typography
              variant="button"
              sx={{ ml: 1 }}
            >
              {name}
            </Typography>
          </Box>
        );
      });
  };

  return (
    <Box
      sx={{
        height: 80,
        width: "100%",
        boxShadow: 3,
        position: "fixed",
        zIndex: 10,
        top: 0,
        left: 0,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {/* Brand Logo */}
      <Box
        component={Link}
        to="/"
        sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
      >
        <IconButton>
          <Box
            component="img"
            src={logo as string}
            alt="Brand Logo"
            sx={{
              width: 40,
              height: 40,
              objectFit: "contain",
              mr: 1
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.text.primary}
        >
          LLMINABOX
        </Typography>
      </Box>

      {/* Navbar Links (Visible on large screens) */}
      <Box
        display={{ xs: "none", lg: "flex" }}
        alignItems="center"
      >
        {renderNavbarLinks()}
      </Box>

      {/* Theme Toggle and Dropdown for large screens */}
      <Box
        display={{ xs: "none", lg: "flex" }}
        alignItems="center"
        sx={{ mx: 2 }}
      >
        {/* Theme Toggle Icon */}
        <IconButton
          onClick={handleThemeToggle}
          color="primary"
        >
          <Icon>
            {appData.theme === "light"
              ? "brightness_7"
              : appData.theme === "dark"
                ? "brightness_2"
                : "palette"}
          </Icon>
        </IconButton>

        {/* Dropdown for theme selection */}
        <IconButton onClick={handleMenuOpen}>
          <Icon>arrow_drop_down</Icon>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleThemeChange("light")}>
            Light Theme
          </MenuItem>
          <MenuItem onClick={() => handleThemeChange("dark")}>
            Dark Theme
          </MenuItem>
          <MenuItem onClick={() => handleThemeChange("llminabox")}>
            Custom Theme
          </MenuItem>
        </Menu>
      </Box>

      {/* Mobile Navbar Toggle (Visible on small screens) */}
      <Box
        display={{ xs: "block", lg: "none" }}
        onClick={handleMobileToggle}
        sx={{ cursor: "pointer", mx: 2 }}
      >
        <Icon>{mobileNavbar ? "close" : "menu"}</Icon>
      </Box>

      {/* Mobile Navbar Menu (includes theme toggler) */}
      <Menu
        anchorEl={mobileNavbar}
        open={Boolean(mobileNavbar)}
        onClose={handleMobileToggle}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {renderNavbarLinks()}

          {/* Theme Toggle Icon inside mobile menu */}
          <MenuItem onClick={handleThemeToggle}>
            <IconButton color="primary">
              <Icon>
                {appData.theme === "light"
                  ? "brightness_7"
                  : appData.theme === "dark"
                    ? "brightness_2"
                    : "palette"}
              </Icon>
            </IconButton>
            <Typography>Toggle Theme</Typography>
          </MenuItem>

          {/* Dropdown for theme selection inside mobile menu */}
          <MenuItem onClick={handleMenuOpen}>
            <Icon>arrow_drop_down</Icon>
            <Typography>Choose Theme</Typography>
          </MenuItem>
        </Box>
      </Menu>

      {/* Dropdown Menu for theme selection in mobile */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleThemeChange("light")}>
          Light Theme
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")}>
          Dark Theme
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("llminabox")}>
          Custom Theme
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
