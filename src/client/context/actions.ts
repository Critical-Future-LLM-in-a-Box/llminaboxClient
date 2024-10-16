import { Dispatch } from "react";
import { AppActions } from "@/client/context/types";

export const setSidenavMini = (
  dispatch: Dispatch<AppActions>,
  value: boolean
) => {
  dispatch({ type: "SET_SIDENAV_MINI", value });
};

export const setSidenavHidden = (
  dispatch: Dispatch<AppActions>,
  value: boolean
) => {
  dispatch({ type: "SET_SIDENAV_HIDDEN", value });
};

export const setNavbarFixed = (
  dispatch: Dispatch<AppActions>,
  value: boolean
) => {
  dispatch({ type: "SET_NAVBAR_FIXED", value });
};

export const setDarkMode = (dispatch: Dispatch<AppActions>, value: boolean) => {
  dispatch({ type: "SET_DARK_MODE", value });
};
