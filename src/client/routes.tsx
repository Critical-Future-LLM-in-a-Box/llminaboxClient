import React from "react";
import Icon from "@mui/material/Icon";

import Dashboard from "@/client/layouts/client-dashboard";
import Pricing from "@/client/layouts/client-pricing";
import Profile from "@/client/layouts/client-profile";
import SignIn from "@/client/layouts/auth-signin";
import SignUp from "@/client/layouts/auth-signup";
import Logout from "@/client/layouts/auth-logout";

import AIBrain from "@/client/layouts/ai-brain";
import CreateAI from "@/client/layouts/ai-create";
import AICapabilities from "@/client/layouts/ai-capabilities";
import AIVoice from "@/client/layouts/ai-voice";
import AIFace from "@/client/layouts/ai-face";
import AILayout from "@/client/layouts/ai-layout";
import AIDemos from "@/client/layouts/ai-demo";
import AICodeSnippets from "@/client/layouts/ai-code-snippet";
import AIMemory from "@/client/layouts/ai-memory";

export interface RouteType {
  name: string;
  route: string;
  component: JSX.Element;
  icon: JSX.Element;
  sidebar?: boolean;
}

export const routes: RouteType[] = [
  {
    name: "Wildcard",
    route: "*",
    component: <Dashboard />,
    icon: <Icon fontSize="small">error</Icon>,
    sidebar: false
  },
  {
    name: "Root",
    route: "/",
    component: <Dashboard />,
    icon: <Icon fontSize="small">home</Icon>,
    sidebar: false
  },
  {
    name: "Dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    icon: <Icon fontSize="small">dashboard</Icon>,
    sidebar: false
  },
  {
    name: "Profile",
    route: "/profile",
    component: <Profile />,
    icon: <Icon fontSize="small">person</Icon>,
    sidebar: false
  },
  {
    name: "Pricing",
    route: "/pricing",
    component: <Pricing />,
    icon: <Icon fontSize="small">receipt_long</Icon>,
    sidebar: false
  },
  {
    name: "Sign Up",
    route: "/auth/sign-up",
    component: <SignUp />,
    icon: <Icon fontSize="small">assignment</Icon>,
    sidebar: false
  },
  {
    name: "Sign In",
    route: "/auth/sign-in",
    component: <SignIn />,
    icon: <Icon fontSize="small">login</Icon>,
    sidebar: false
  },
  {
    name: "Logout",
    route: "/auth/logout",
    component: <Logout />,
    icon: <Icon fontSize="small">exit_to_app</Icon>,
    sidebar: false
  },
  {
    name: "AI Brain",
    route: "/ai-brain",
    component: <AIBrain />,
    icon: <Icon fontSize="medium">psychology</Icon>,
    sidebar: true
  },
  {
    name: "Create AI Assistant",
    route: "/create-ai",
    component: <CreateAI />,
    icon: <Icon fontSize="small">build</Icon>,
    sidebar: true
  },
  {
    name: "AI Capabilities",
    route: "/ai-capabilities",
    component: <AICapabilities />,
    icon: <Icon fontSize="small">extension</Icon>,
    sidebar: true
  },
  {
    name: "AI Voice",
    route: "/ai-voice",
    component: <AIVoice />,
    icon: <Icon fontSize="small">record_voice_over</Icon>,
    sidebar: true
  },
  {
    name: "AI Face",
    route: "/ai-face",
    component: <AIFace />,
    icon: <Icon fontSize="small">face</Icon>,
    sidebar: true
  },
  {
    name: "AI Layout",
    route: "/ai-layout",
    component: <AILayout />,
    icon: <Icon fontSize="small">view_compact</Icon>,
    sidebar: true
  },
  {
    name: "AI Demos",
    route: "/ai-demos",
    component: <AIDemos />,
    icon: <Icon fontSize="small">play_circle_outline</Icon>,
    sidebar: true
  },
  {
    name: "AI Code Snippets",
    route: "/ai-code-snippets",
    component: <AICodeSnippets />,
    icon: <Icon fontSize="small">code</Icon>,
    sidebar: true
  },
  {
    name: "AI Memory",
    route: "/ai-memory",
    component: <AIMemory />,
    icon: <Icon fontSize="small">storage</Icon>,
    sidebar: true
  }
];
