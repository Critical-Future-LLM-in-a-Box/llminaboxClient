import { createTheme } from "@mui/material/styles";
import colors from "@/client/assets/themes/main/colors";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: colors.lightBlue,
      contrastText: colors.white
    },
    secondary: {
      main: colors.tealAccent,
      contrastText: colors.white
    },
    background: {
      default: colors.white,
      paper: colors.white
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary
    },
    error: {
      main: colors.redAccent
    },
    success: {
      main: colors.greenAccent
    },
    warning: {
      main: colors.yellowAccent
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: "none"
    }
  }
});

export default mainTheme;
