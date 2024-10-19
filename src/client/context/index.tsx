import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useMemo
} from "react";
import { useImmerReducer } from "use-immer";
import { AppState, AppActions } from "@/client/context/types";

export const defaultState: AppState = {
  sidenav: {
    mini: false,
    hidden: false
  },
  navbar: {
    fixed: true
  },
  theme: "llminabox"
};

function reducer(draft: AppState, action: AppActions) {
  if (action.type === "SET_SIDENAV_MINI") {
    draft.sidenav.mini = action.value;
  }

  if (action.type === "SET_SIDENAV_HIDDEN") {
    draft.sidenav.hidden = action.value;
  }

  if (action.type === "SET_NAVBAR_FIXED") {
    draft.navbar.fixed = action.value;
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
