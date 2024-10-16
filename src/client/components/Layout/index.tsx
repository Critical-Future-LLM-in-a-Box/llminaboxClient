import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/client/context";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [appData] = useAppContext();
  const {
    sidenav: { mini: miniSidenav }
  } = appData;

  return (
    <Box
      sx={({ breakpoints, transitions, spacing }) => ({
        marginTop: spacing(10),
        [breakpoints.up("md")]: {
          marginLeft: miniSidenav ? spacing(10) : spacing(35)
        },
        transition: transitions.create(["margin-left", "margin-top"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard
        })
      })}
    >
      {children}
    </Box>
  );
};

export default Layout;
