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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Pricing = () => {
  const redirectToCheckout = async (billingCycle) => {
    try {
        const response = await fetch('/pay/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({billingCycle}),
        });
        const data = await response.json();
        if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;

        } else {
            alert('Failed to proceed to checkout, please try again later.');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('An error occurred, please try again later');
    }
};

  return (
    <Box p={3}>
      <Container maxWidth="lg">
        {/* Page Title */}
        <Box
          textAlign="center"
          mb={5}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
          >
            AI Pricing Plans
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Unlock the AI assistant experience tailored to your needs
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {/* Monthly Plan */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
              <Box textAlign="center">
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
                  Unlock Premium Features
                </Typography>
                </Box>
                <Divider />
                <Box mt={2} textAlign="center">
                  <ul>
                    <li>✔️ Feature A</li>
                    <li>✔️ Feature B</li>
                    <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mt: 2 }}
                  onClick={() => redirectToCheckout('monthly')}
                >
                  Choose Plan
                </Button>
                </Box>
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
              <Box textAlign="center">
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
                  Benefit From Our Annual Plan Discount
                </Typography>
                </Box>
                <Divider />
                <Box mt={2} textAlign= "center">
                  <ul>
                  <li>✔️ Feature A</li>
                  <li>✔️ Feature B</li>
                  <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => redirectToCheckout('annual')}
                >
                  Choose Plan
                </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Enterprise Plan */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
              <Box textAlign="center">
                <AccessTimeIcon
                  fontSize="large"
                  color="warning"
                />
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Enterprise Plan
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  Contact Us For Pricing
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                >
                  Unlock Your Dedicated AI Solution
                </Typography>
                </Box>
                <Divider />
                <Box mt={2} textAlign="center">
                  <ul>
                  <li>✔️ Feature A</li>
                  <li>✔️ Feature B</li>
                  <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 }}
                  onClick={() => window.location.href = 'https://criticalfutureglobal.com/'}
                >
                  Contact Us
                </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
