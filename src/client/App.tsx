import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { routes, RouteType } from "@/client/routes";
import Sidebar from "@/client/components/Sidebar";
import { llminabox } from "@/client/assets/themes";
import Header from "@/client/components/Header";
import Layout from "@/client/components/Layout";
import ChatbotBubble from "@/assistant/components/ChatbotBubble";
import "material-icons/iconfont/material-icons.css";
import "@fontsource/roboto";
import "@/client/index.css";
import { assistantConfig } from "@/client/config";
import { useAppContext } from "./context";

export default function App() {
  const [appData] = useAppContext();
  const { pathname } = useLocation();

  const lightTheme = createTheme({ palette: { mode: "light" } });
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const llminaboxTheme = createTheme({
    palette: {
      mode: "dark",
      ...llminabox.palette
    }
  });

  const theme =
    appData.theme === "light"
      ? lightTheme
      : appData.theme === "dark"
        ? darkTheme
        : llminaboxTheme;

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
      <Header routes={routes} />
      <Sidebar routes={routes} />
      <Layout>
        <Routes>{getRoutes(routes)}</Routes>
      </Layout>
      <ChatbotBubble initConfig={assistantConfig} />
    </ThemeProvider>
  );
}
