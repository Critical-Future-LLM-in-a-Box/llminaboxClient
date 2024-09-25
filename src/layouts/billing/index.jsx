/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import { Container, Box, Typography } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PriceInfoCard from "examples/Cards/InfoCards/PriceInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import Logo from "../../assets/images/logo.png";

function Billing() {

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
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
      <Container
    maxWidth='xs' // Make the container narrower
    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, padding: 1 }} // Reduce gap and padding
>
    <Box 
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0.5, width: '100%', maxWidth: 300 }} // Reduce Box size and gap
    >
        <Typography variant='h5' component='h1' gutterBottom sx={{ whiteSpace: 'nowrap', textAlign: 'center', fontSize: '1.5rem' }}> 
            Transform Your B2B AI Solutions
        </Typography>
        <Typography variant='body2' color='text.secondary' paragraph sx={{ whiteSpace: 'nowrap', textAlign: 'center', fontSize: '0.875rem' }}>
            LLM in a Box is the most advanced AI solution tailored to revolutionize your business operations.
        </Typography>
        <Box
            component='img'
            sx={{
                width: '100%',
                maxWidth: 165,
                borderRadius: 1.25,
                boxShadow: 1.5,
                mb: 2
            }}
            alt='LLM in a Box'
            src='/src/assets/images/logo.png'
        />
    </Box>
</Container>

        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <PriceInfoCard
                color="info"
                icon="star"
                title="Monthly Plan"
                price="$89.99/month"
                description="Unlock premium features"
                //features={['Feature A', 'Feature B', 'Feature C']}
                features={[]}
                onClick={() => redirectToCheckout('monthly')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PriceInfoCard
                color="success"
                icon={<CalendarMonthIcon/>}
                title="Annual Plan"
                price="$999.99/year"
                description="Benefit from our annual plan discount"
                //features={['All Basic Features', 'Feature D', 'Feature E', 'Priority Support']}
                features={[]}
                onClick={() => redirectToCheckout('annual')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PriceInfoCard
                color="warning"
                icon="diamond"
                title="Enterprise Plan"
                price="Contact us for pricing"
                description="24/7 dedicated support for large-scale operations"
                //features={['All Pro Features', 'Feature F', 'Feature G', '24/7 Dedicated Support']}
                features={[]}
                onClick={() => window.location.href = 'https://criticalfutureglobal.com/'}
              />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
