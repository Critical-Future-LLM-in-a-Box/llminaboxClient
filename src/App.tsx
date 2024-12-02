import React, { useEffect } from "react";
import { useLocation, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import { useAppContext } from "@/context";
import { routes, RouteType } from "@/client/routes";
import { lightTheme, darkTheme } from "@/client/assets/themes";
import Header from "@/client/components/Header";
import MainContent from "@/client/components/Main";
import Footer from "@/client/components/Footer";
import {
  SideNavigation,
  BottomNavigation
} from "@/client/components/Navigation";

import "@fontsource/roboto";

export default function App() {
  const [appData] = useAppContext();
  const { pathname } = useLocation();

  const theme = appData.theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getRoutes = (allRoutes: RouteType[]): JSX.Element[] =>
    allRoutes.map((route) => (
      <Route
        key={route.name}
        path={route.route}
        element={route.component}
      />
    ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Header */}
        <Box>
          <Header routes={routes} />
        </Box>

        {/* Main content area with Sidebar and MainContent */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* Sidebar */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: appData.sidenav.mini ? "80px" : "250px",
              overflowY: "auto",
              flexShrink: 0
            }}
          >
            <SideNavigation routes={routes} />
          </Box>

          {/* Main Content */}
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
              <MainContent
                routes={routes}
                getRoutes={getRoutes}
              />
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </Box>

        {/* Bottom Navigation (Visible only on small screens) */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 999,
            display: { xs: "block", md: "none" }
          }}
        >
          <BottomNavigation routes={routes} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
