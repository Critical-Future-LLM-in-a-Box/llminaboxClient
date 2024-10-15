import React from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DashboardLayout from "@/client/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/client/examples/Navbars/DashboardNavbar";
import Footer from "@/client/examples/Footer";
import MDBox from "@/client/components/MDBox";

const BillingAndPricing = () => {
  const redirectToCheckout = async (billingCycle) => {
    try {
      const response = await fetch("/pay/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ billingCycle })
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to proceed to checkout, please try again later.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred, please try again later.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox
        mt={8}
        mb={3}
      >
        <Container maxWidth="lg">
          {/* Pricing Section */}
          <Box
            textAlign="center"
            mb={5}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
            >
              Choose Your Plan
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
            >
              Select the perfect plan for your business needs.
            </Typography>
          </Box>

          <Grid
            container
            sx={{ justifyContent: "center" }}
            spacing={3}
          >
            {/* Monthly Plan */}
            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardContent>
                  <StarIcon
                    fontSize="large"
                    color="info"
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    Monthly Plan
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $89.99/month
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    paragraph
                  >
                    Unlock premium features for a month.
                  </Typography>
                  <Divider />
                  <Box mt={2}>
                    <ul>
                      <li>Unlimited Assistants</li>
                      <li>Basic Support</li>
                      <li>Access to All Features</li>
                    </ul>
                  </Box>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => redirectToCheckout("monthly")}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Annual Plan */}
            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardContent>
                  <CalendarMonthIcon
                    fontSize="large"
                    color="success"
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    Annual Plan
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $999.99/year
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    paragraph
                  >
                    Get a discount with our annual plan.
                  </Typography>
                  <Divider />
                  <Box mt={2}>
                    <ul>
                      <li>All Monthly Plan Features</li>
                      <li>Priority Support</li>
                      <li>Advanced Analytics</li>
                    </ul>
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => redirectToCheckout("annual")}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Billing Section */}
          <Box
            mt={8}
            mb={3}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              Billing Information
            </Typography>
            <Grid
              container
              spacing={3}
            >
              {/* Payment Methods */}
              <Grid
                item
                xs={12}
                md={8}
              >
                <Card>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      mb={2}
                    >
                      <CreditCardIcon
                        fontSize="large"
                        color="primary"
                      />
                      <Typography
                        variant="h6"
                        ml={2}
                      >
                        Payment Method
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      mt={2}
                      mb={2}
                    >
                      <Typography variant="body1">
                        <strong>MasterCard</strong> ending in **7852
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        Expiration: 11/25
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PaymentIcon />}
                    >
                      Update Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Invoices */}
              <Grid
                item
                xs={12}
                md={4}
              >
                <Card>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      mb={2}
                    >
                      <ReceiptIcon
                        fontSize="large"
                        color="primary"
                      />
                      <Typography
                        variant="h6"
                        ml={2}
                      >
                        Invoices
                      </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Typography variant="body1">
                        Invoice #12345 - $89.99
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        Date: 10/01/2024
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body1">
                        Invoice #12346 - $999.99
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        Date: 11/01/2024
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AccountBalanceIcon />}
                    >
                      View All Invoices
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default BillingAndPricing;
