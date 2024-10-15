import React from "react";
import Icon from "@mui/material/Icon";

import Dashboard from "@/client/layouts/dashboard";
import Billing from "@/client/layouts/billing";
import Profile from "@/client/layouts/profile";
import SignIn from "@/client/layouts/authentication/sign-in";
import SignUp from "@/client/layouts/authentication/sign-up";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    type: "collapse",
    component: <Dashboard />,
    icon: <Icon fontSize="small">dashboard</Icon>
  },
  {
    name: "Profile",
    route: "/profile",
    type: "collapse",
    component: <Profile />,
    icon: <Icon fontSize="small">person</Icon>
  },

  {
    name: "Billing",
    route: "/billing",
    type: "collapse",
    component: <Billing />,
    icon: <Icon fontSize="small">receipt_long</Icon>
  },
  {
    name: "Sign Up",
    route: "/auth/sign-up",
    type: "collapse",
    component: <SignUp />,
    icon: <Icon fontSize="small">assignment</Icon>
  },
  {
    name: "Sign In",
    route: "/auth/sign-in",
    type: "collapse",
    component: <SignIn />,
    icon: <Icon fontSize="small">login</Icon>
  }
];

export default routes;
