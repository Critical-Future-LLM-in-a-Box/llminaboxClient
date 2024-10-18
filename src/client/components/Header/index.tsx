import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon, Menu, Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RouteType } from "@/client/routes";
import logo from "@/client/assets/images/llminaboxlogo.png";

interface HeaderProps {
  routes: RouteType[];
}

const Header: React.FC<HeaderProps> = ({ routes }) => {
  const [mobileNavbar, setMobileNavbar] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleMobileToggle = (event: React.MouseEvent<HTMLElement>) => {
    setMobileNavbar(mobileNavbar ? null : event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/sign-in");
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

      {/* Mobile Navbar Toggle (Visible on small screens) */}
      <Box
        display={{ xs: "block", lg: "none" }}
        onClick={handleMobileToggle}
        sx={{ cursor: "pointer" }}
      >
        <Icon>{mobileNavbar ? "close" : "menu"}</Icon>
      </Box>

      {/* Mobile Navbar Menu */}
      <Menu
        anchorEl={mobileNavbar}
        open={Boolean(mobileNavbar)}
        onClose={handleMobileToggle}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {renderNavbarLinks()}
          <Button
            variant="text"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            <Icon>logout</Icon> Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Header;
