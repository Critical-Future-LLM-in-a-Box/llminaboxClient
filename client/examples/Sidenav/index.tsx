import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { List, Divider, Link, Icon } from "@mui/material";

// Custom components
import MDBox from "@/client/components/MDBox";
import MDTypography from "@/client/components/MDTypography";
import SidenavCollapse from "@/client/examples/Sidenav/SidenavCollapse";
import SidenavRoot from "@/client/examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "@/client/examples/Sidenav/styles/sidenav";

// App context
import { useAppContext } from "@/client/context";

// Types
interface Route {
  name?: string;
  route?: string;
  type?: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
}

interface SidenavProps {
  color?: string;
  brand?: string;
  brandName: string;
  routes: Route[];
}

const Sidenav: React.FC<SidenavProps> = ({ brand, brandName, routes }) => {
  const [controller, dispatch] = useAppContext();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  // Determine text color based on the sidenav's state
  const textColor =
    transparentSidenav || (whiteSidenav && !darkMode) ? "dark" : "white";

  // Close sidenav when mini version is activated
  const closeSidenav = () => dispatch({ type: "MINI_SIDENAV", value: true });

  // Adjust sidenav state based on screen size
  useEffect(() => {
    const handleMiniSidenav = () => {
      const isMobileView = window.innerWidth < 1200;
      dispatch({ type: "MINI_SIDENAV", value: isMobileView });
      dispatch({
        type: "TRANSPARENT_SIDENAV",
        value: isMobileView ? false : transparentSidenav
      });
      dispatch({
        type: "WHITE_SIDENAV",
        value: isMobileView ? false : whiteSidenav
      });
    };

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  // Render all the routes
  const renderRoutes = routes.map(
    ({ type, name, icon, title, key, href, route, noCollapse }) => {
      if (type === "collapse") {
        return href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name!}
              icon={icon!}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink
            key={key}
            to={route!}
          >
            <SidenavCollapse
              name={name!}
              icon={icon!}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        return (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        return (
          <Divider
            key={key}
            light={
              darkMode
                ? !transparentSidenav && whiteSidenav
                : !whiteSidenav && !transparentSidenav
            }
          />
        );
      }
      return null;
    }
  );

  return (
    <SidenavRoot
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox
        pt={3}
        pb={1}
        px={4}
        textAlign="center"
      >
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography
            variant="h6"
            color="secondary"
          >
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
        >
          {brand && (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width="2rem"
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          darkMode
            ? !transparentSidenav && whiteSidenav
            : !whiteSidenav && !transparentSidenav
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};

export default Sidenav;
