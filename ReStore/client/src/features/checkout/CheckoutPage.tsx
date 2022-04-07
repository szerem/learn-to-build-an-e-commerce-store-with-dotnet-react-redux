import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ReviewCard from './ReviewCard';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <ReviewCard />;
    default:
      throw new Error('Unknown step');
  }
};

const CheckoutPage = () => {
  const [activeStep] = useState(0);
  //, setActiveStep
  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return (
    <Container component={Paper} maxWidth="sm">
      <Typography variant="h2">CheckoutPage</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {getStepContent(1)}
        <Box>
          <Button></Button>
        </Box>
      </>

      {/* <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button> */}
    </Container>
  );
};

export default CheckoutPage;
