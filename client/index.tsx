import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "@/client/context";
import App from "@/client/App";

/**
 * Main entry point of the React application.
 * It renders the application to the DOM.
 *
 * - AppContextProvider: Provides global state management for the application.
 * - Router: Wraps the application with React Router to enable routing.
 * - App: Main component of the application.
 */
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  );
}
