import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MDBox from "@/client/components/MDBox";
import MDInput from "@/client/components/MDInput";
import MDButton from "@/client/components/MDButton";
import DashboardLayout from "@/client/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/client/examples/Navbars/DashboardNavbar";
import Footer from "@/client/examples/Footer";

function SignIn() {
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
                Sign In to Your Account
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Enter your email and password to sign in.
              </Typography>
            </MDBox>

            {/* Form Fields */}
            <MDBox
              component="form"
              role="form"
            >
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

              {/* Remember Me */}
              <MDBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDBox
                  display="flex"
                  alignItems="center"
                >
                  <Checkbox color="primary" />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Remember me
                  </Typography>
                </MDBox>
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
                  Sign In
                </MDButton>
              </MDBox>

              {/* Redirect to Sign Up */}
              <MDBox
                textAlign="center"
                mt={3}
              >
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    to="/authentication/sign-up"
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: "bold"
                    }}
                  >
                    Sign Up
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

export default SignIn;
