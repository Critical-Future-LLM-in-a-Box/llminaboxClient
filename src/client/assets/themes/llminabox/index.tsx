export const colors = themeColors();
export const llminabox = {
  palette: {
    primary: {
      main: colors.lightBlue
    },
    secondary: {
      main: colors.tealAccent
    }
  }
};

function themeColors() {
  return {
    white: "#FFFFFF",
    darkBlue: "#00171F",
    mediumBlue: "#003459",
    lightBlue: "#007EA7",
    skyBlue: "#00A8E8",

    redAccent: "#EF476F",
    yellowAccent: "#FFD166",
    greenAccent: "#06D6A0",
    tealAccent: "#118AB2",

    deepGreen: "#073B4C",

    textPrimary: "#00171F",
    textSecondary: "#003459",
    textLink: "#00A8E8"
  };
}
