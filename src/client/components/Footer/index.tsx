import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface Company {
  href: string;
  name: string;
}

interface LinkItem {
  href: string;
  name: string;
}

interface FooterProps {
  company?: Company;
  links?: LinkItem[];
}

const Footer: React.FC<FooterProps> = ({
  company = {
    href: "https://criticalfutureglobal.com/",
    name: "Critical Future"
  }
}) => {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      sx={{
        mt: "auto",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          &copy; {new Date().getFullYear()} Powered by
        </Typography>
        <Link
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography
            variant="button"
            fontWeight="medium"
            ml={0.5}
            sx={{
              "color": theme.palette.primary.main,
              "&:hover": { color: theme.palette.primary.light }
            }}
          >
            {company.name}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
