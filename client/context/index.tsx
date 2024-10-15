import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useMemo
} from "react";
import { useImmerReducer } from "use-immer";

export interface AppState {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  darkMode: boolean;
}

export type ActionType =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "TRANSPARENT_SIDENAV"; value: boolean }
  | { type: "WHITE_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "DARKMODE"; value: boolean };

function reducer(draft: AppState, action: ActionType) {
  switch (action.type) {
    case "MINI_SIDENAV":
      draft.miniSidenav = action.value;
      break;
    case "TRANSPARENT_SIDENAV":
      draft.transparentSidenav = action.value;
      break;
    case "WHITE_SIDENAV":
      draft.whiteSidenav = action.value;
      break;
    case "SIDENAV_COLOR":
      draft.sidenavColor = action.value;
      break;
    case "TRANSPARENT_NAVBAR":
      draft.transparentNavbar = action.value;
      break;
    case "FIXED_NAVBAR":
      draft.fixedNavbar = action.value;
      break;
    case "OPEN_CONFIGURATOR":
      draft.openConfigurator = action.value;
      break;
    case "DARKMODE":
      draft.darkMode = action.value;
      break;
    default:
      break;
  }
}

export const defaultState: AppState = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: false,
  sidenavColor: "info",
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  darkMode: false
};

export const AppContext = createContext<[AppState, Dispatch<ActionType>]>([
  defaultState,
  () => {}
]);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(reducer, defaultState);
  const providedValue: [AppState, Dispatch<ActionType>] = useMemo(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={providedValue}>{children}</AppContext.Provider>
  );
}
