export interface AppState {
  sidenav: {
    mini: boolean;
    hidden: boolean;
  };
  navbar: {
    fixed: boolean;
  };
  darkMode: boolean;
}

export type AppActions =
  | { type: "SET_SIDENAV_MINI"; value: boolean }
  | { type: "SET_SIDENAV_HIDDEN"; value: boolean }
  | { type: "SET_NAVBAR_FIXED"; value: boolean }
  | { type: "SET_DARK_MODE"; value: boolean };
