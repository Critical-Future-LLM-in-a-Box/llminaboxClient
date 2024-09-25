import React from 'react';
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function PriceInfoCard({ color, icon, title, price, description, features, buttonText, onClick }) {
  return (
    <Card>
      <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography variant="h4" fontWeight="medium" my={1}>
          {price}
        </MDTypography>
        {description && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        )}
        <Divider sx={{ my: 2 }} />
        <List>
          {features.map((feature, index) => (
            <ListItem key={index} dense>
              <ListItemIcon>
                <Icon fontSize="small" color="success">check</Icon>
              </ListItemIcon>
              <ListItemText 
                primary={
                  <MDTypography variant="body2" fontWeight="regular">
                    {feature}
                  </MDTypography>
                } 
              />
            </ListItem>
          ))}
        </List>
        <MDButton 
          variant="gradient" 
          color={color}
          fullWidth 
          onClick={onClick}
          sx={{ mt: 2 }}
        >
          <Icon sx={{ fontWeight: "bold" }}>shopping_cart</Icon>
          &nbsp;{buttonText}
        </MDButton>
      </MDBox>
    </Card>
  );
}

PriceInfoCard.defaultProps = {
  color: "info",
  description: "",
  buttonText: "Choose Plan",
};

PriceInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default PriceInfoCard;