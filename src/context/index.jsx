import { default as React, createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

/**
 * Context for the application state
 */
export const appContext = createContext();

/**
 * Custom hook to use the app context
 * @returns {Object} - The app context
 */
export function useAppContext() {
  return useContext(appContext);
}

/**
 * AppContextProvider component to provide global state to its children
 * @param {Object} props - React component props
 * @param {React.ReactNode} props.children - Children components that need access to the context
 * @returns {JSX.Element} - App context provider with the global state
 */
export function AppContextProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false
  };

  const contextData = useImmerReducer(reducer, initialState);

  return (
    <appContext.Provider value={contextData}>{children}</appContext.Provider>
  );
}

/**
 * Reducer function to manage the app state
 * @param {Object} draft - Draft state (immutable)
 * @param {Object} action - Action containing the type and value to update the state
 */
function reducer(draft, action) {
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
    case "DIRECTION":
      draft.direction = action.value;
      break;
    case "LAYOUT":
      draft.layout = action.value;
      break;
    case "DARKMODE":
      draft.darkMode = action.value;
      break;
    default:
      break;
  }
}

/**
 * Dispatch action to toggle mini sidenav
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for miniSidenav
 */
export const setMiniSidenav = (dispatch, value) =>
  dispatch({ type: "MINI_SIDENAV", value });

/**
 * Dispatch action to toggle transparent sidenav
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for transparentSidenav
 */
export const setTransparentSidenav = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_SIDENAV", value });

/**
 * Dispatch action to toggle white sidenav
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for whiteSidenav
 */
export const setWhiteSidenav = (dispatch, value) =>
  dispatch({ type: "WHITE_SIDENAV", value });

/**
 * Dispatch action to set the sidenav color
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {string} value - New value for sidenavColor
 */
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });

/**
 * Dispatch action to toggle transparent navbar
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for transparentNavbar
 */
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });

/**
 * Dispatch action to toggle fixed navbar
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for fixedNavbar
 */
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });

/**
 * Dispatch action to toggle open configurator
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for openConfigurator
 */
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

/**
 * Dispatch action to set the layout direction (ltr/rtl)
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {string} value - New value for direction (ltr/rtl)
 */
export const setDirection = (dispatch, value) =>
  dispatch({ type: "DIRECTION", value });

/**
 * Dispatch action to set the layout type
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {string} value - New value for layout (e.g. 'dashboard')
 */
export const setLayout = (dispatch, value) =>
  dispatch({ type: "LAYOUT", value });

/**
 * Dispatch action to toggle dark mode
 * @param {Function} dispatch - Dispatch function from the reducer
 * @param {boolean} value - New value for darkMode
 */
export const setDarkMode = (dispatch, value) =>
  dispatch({ type: "DARKMODE", value });
