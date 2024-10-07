import { default as React, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import { useAppContext } from "@/context";
import routes from "@/routes";

import MDBox from "@/components/MDBox";
import Sidenav from "@/examples/Sidenav";
import Configurator from "@/examples/Configurator";

import theme from "@/assets/theme";
import themeDark from "@/assets/theme-dark";

import brandWhite from "@/assets/images/llminaboxlogo.png";
import brandDark from "@/assets/images/llminaboxlogo.png";

import "material-icons/iconfont/material-icons.css";
import "@fontsource/roboto";

/**
 * Main Application component
 * Handles the routing, state management, and overall structure of the dashboard.
 * It provides theme configuration, side navigation, and other global elements.
 */
export default function App() {
  // Global app context data
  const [appData, dispatch] = useAppContext();

  // State to track hover event on sidenav
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  // Access current pathname for location-based effects
  const { pathname } = useLocation();

  /**
   * Handle the mouse enter event on the sidenav.
   * This expands the sidenav when the user hovers over it.
   */
  const handleOnMouseEnter = () => {
    if (appData.miniSidenav && !onMouseEnter) {
      dispatch({ type: "MINI_SIDENAV", value: false });
      setOnMouseEnter(true);
    }
  };

  /**
   * Handle the mouse leave event on the sidenav.
   * This collapses the sidenav when the user moves the mouse away.
   */
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch({ type: "MINI_SIDENAV", value: true });
      setOnMouseEnter(false);
    }
  };

  /**
   * Toggle the configurator open/close state.
   * This function is triggered by clicking the settings button.
   */
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !appData.openConfigurator });
  };

  /**
   * Scroll to top on location change.
   */
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  /**
   * Recursive function to generate routes from a nested routes configuration.
   * @param {Array} allRoutes - Array of route objects
   * @returns {Array} - Array of Route components
   */
  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });
  };

  // Floating button to toggle the Configurator component
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon
        fontSize="small"
        color="inherit"
      >
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={appData.darkMode ? themeDark : theme}>
      <CssBaseline />
      {appData.layout === "dashboard" && (
        <>
          {/* Side navigation bar with dynamic settings */}
          <Sidenav
            color={appData.sidenavColor}
            brand={
              (appData.transparentSidenav && !appData.darkMode) ||
              appData.whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Material Dashboard 2"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* Configurator settings panel */}
          <Configurator />
          {configsButton}
        </>
      )}
      {appData.layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        {/* Default route if no matching path */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" />}
        />
      </Routes>
    </ThemeProvider>
  );
}
