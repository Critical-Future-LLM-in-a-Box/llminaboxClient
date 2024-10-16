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
            Choose the best plan that suits your AI assistant needs.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {/* Basic Plan */}
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
                  Basic Plan
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  $49.99/month
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                >
                  Ideal for beginners looking to test AI assistant features.
                </Typography>
                <Divider />
                <Box mt={2}>
                  <ul>
                    <li>5 AI Assistants</li>
                    <li>Email Support</li>
                    <li>Basic Features</li>
                  </ul>
                </Box>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mt: 2 }}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Pro Plan */}
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
                  Pro Plan
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                >
                  $99.99/month
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                >
                  Best for small businesses needing AI support.
                </Typography>
                <Divider />
                <Box mt={2}>
                  <ul>
                    <li>Unlimited AI Assistants</li>
                    <li>Priority Support</li>
                    <li>Advanced Analytics</li>
                  </ul>
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                >
                  Choose Plan
                </Button>
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
                  Contact Us for Pricing
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                >
                  For large enterprises needing a dedicated AI solution.
                </Typography>
                <Divider />
                <Box mt={2}>
                  <ul>
                    <li>Custom AI Assistants</li>
                    <li>24/7 Dedicated Support</li>
                    <li>Custom Solutions</li>
                  </ul>
                </Box>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 }}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
