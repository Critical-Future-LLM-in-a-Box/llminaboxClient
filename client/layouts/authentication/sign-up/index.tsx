import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MDBox from "@/client/components/MDBox";
import MDButton from "@/client/components/MDButton";
import MDInput from "@/client/components/MDInput";
import DashboardLayout from "@/client/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/client/examples/Navbars/DashboardNavbar";
import Footer from "@/client/examples/Footer";

function SignUp() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        mb={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <MDBox
          width="100%"
          maxWidth="500px"
          mx="auto"
          px={1}
        >
          <Card sx={{ padding: 4, boxShadow: 3 }}>
            {/* Header */}
            <MDBox
              textAlign="center"
              mb={3}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
              >
                Create Your Account
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Fill in your details to create an account.
              </Typography>
            </MDBox>

            {/* Form Fields */}
            <MDBox
              component="form"
              role="form"
            >
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                />
              </MDBox>

              {/* Terms and Conditions */}
              <MDBox
                display="flex"
                alignItems="center"
                mt={2}
              >
                <Checkbox color="primary" />
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  I agree to the{" "}
                  <Link
                    to="#"
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              </MDBox>

              {/* Submit Button */}
              <MDBox
                mt={4}
                mb={2}
              >
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  size="large"
                >
                  Sign Up
                </MDButton>
              </MDBox>

              {/* Redirect to Sign In */}
              <MDBox
                textAlign="center"
                mt={3}
              >
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    to="/authentication/sign-in"
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: "bold"
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SignUp;
