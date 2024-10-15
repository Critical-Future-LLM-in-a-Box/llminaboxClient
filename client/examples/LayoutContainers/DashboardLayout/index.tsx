import React, { ReactNode } from "react";
import MDBox from "@/client/components/MDBox";
import { useAppContext } from "@/client/context";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [controller] = useAppContext();
  const { miniSidenav } = controller;

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard
          })
        }
      })}
    >
      {children}
    </MDBox>
  );
};

export default DashboardLayout;
