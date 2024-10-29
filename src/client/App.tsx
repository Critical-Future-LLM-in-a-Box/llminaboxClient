import React, { useEffect } from "react";
import { useLocation, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { routes, RouteType } from "@/client/routes";
import {
  SideNavigation,
  BottomNavigation
} from "@/client/components/Navigation";
import { lightTheme, darkTheme } from "@/client/assets/themes";
import Header from "@/client/components/Header";
import MainContent from "@/client/components/Main";
import Footer from "@/client/components/Footer";
import "material-icons/iconfont/material-icons.css";
import "@fontsource/roboto";
import "@/client/index.css";
import { useAppContext } from "@/client/context";

export default function App() {
  const [appData] = useAppContext();
  const { pathname } = useLocation();
  const theme = appData.theme === "dark" ? darkTheme : lightTheme;
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getRoutes = (allRoutes: RouteType[]): JSX.Element[] => {
    return allRoutes.map((route) => (
      <Route
        key={route.name}
        path={route.route}
        element={route.component}
      />
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <Header routes={routes} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Side Navigation */}
        <SideNavigation routes={routes} />

        {/* Main Content */}
        <div style={{ flexGrow: 1 }}>
          <MainContent
            routes={routes}
            getRoutes={getRoutes}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation (Visible only on small screens) */}
      {isSmallScreen && <BottomNavigation routes={routes} />}
    </ThemeProvider>
  );
}
