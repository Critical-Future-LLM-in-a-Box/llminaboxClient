import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppContext } from "@/client/context";
import routes from "@/client/routes";
import Sidenav from "@/client/examples/Sidenav";
import Configurator from "@/client/examples/Configurator";
import theme from "@/client/assets/theme";
import themeDark from "@/client/assets/theme-dark";
import "material-icons/iconfont/material-icons.css";
import "@fontsource/roboto";
import "@/index.css";
import ChatbotBubble from "@/assistant/components/ChatbotBubble";

interface Route {
  name?: string;
  route?: string;
  type?: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function App() {
  const [appData] = useAppContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getRoutes = (allRoutes: Route[]): JSX.Element[] => {
    return allRoutes.map((route) => {
      return (
        <Route
          key={route.name}
          path={route.route}
          element={route.component}
        />
      );
    });
  };

  return (
    <ThemeProvider theme={appData.darkMode ? themeDark : theme}>
      <CssBaseline />

      <Sidenav
        brand="/client/assets/images/llminaboxlogo.png"
        brandName="LLM in a Box"
        color={appData.sidenavColor}
        routes={routes}
      />

      <Routes>
        {getRoutes(routes)}

        <Route
          path="*"
          element={<Navigate to="/dashboard" />}
        />
      </Routes>

      <Configurator />
      <ChatbotBubble />
    </ThemeProvider>
  );
}
