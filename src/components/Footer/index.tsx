import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Powered by
        </Typography>
        <Link
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none"
          }}
        >
          <Typography
            variant="button"
            fontWeight="medium"
            ml={0.5}
          >
            {company.name}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
