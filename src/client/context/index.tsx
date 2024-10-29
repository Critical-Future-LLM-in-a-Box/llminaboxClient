import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useMemo
} from "react";
import { useImmerReducer } from "use-immer";

export interface AppState {
  sidenav: {
    mini: boolean;
    hidden: boolean;
  };

  theme: "light" | "dark";
}

export type AppActions =
  | { type: "SET_SIDENAV_MINI"; value: boolean }
  | { type: "SET_SIDENAV_HIDDEN"; value: boolean }
  | { type: "SET_THEME"; value: AppState["theme"] };

export const defaultState: AppState = {
  sidenav: {
    mini: false,
    hidden: false
  },
  theme: "dark"
};

function reducer(draft: AppState, action: AppActions) {
  if (action.type === "SET_SIDENAV_MINI") {
    draft.sidenav.mini = action.value;
  }

  if (action.type === "SET_SIDENAV_HIDDEN") {
    draft.sidenav.hidden = action.value;
  }

  if (action.type === "SET_THEME") {
    draft.theme = action.value;
  }
}

export const AppContext = createContext<[AppState, Dispatch<AppActions>]>([
  defaultState,
  () => {}
]);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(reducer, defaultState);
  const providedValue: [AppState, Dispatch<AppActions>] = useMemo(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={providedValue}>{children}</AppContext.Provider>
  );
}

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

export const setTheme = (
  dispatch: Dispatch<AppActions>,
  value: AppState["theme"]
) => {
  dispatch({ type: "SET_THEME", value });
};
