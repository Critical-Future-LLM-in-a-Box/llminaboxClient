export interface AppState {
  sidenav: {
    mini: boolean;
    hidden: boolean;
  };
  navbar: {
    fixed: boolean;
  };
  theme: string;
}

export type AppActions =
  | { type: "SET_SIDENAV_MINI"; value: boolean }
  | { type: "SET_SIDENAV_HIDDEN"; value: boolean }
  | { type: "SET_NAVBAR_FIXED"; value: boolean }
  | { type: "SET_THEME"; value: string };
