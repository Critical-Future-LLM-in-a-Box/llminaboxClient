import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "@/App";
import { MaterialUIControllerProvider } from "@/context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </Router>
);
