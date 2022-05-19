import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  'pk_test_51L14yfA61uEThykOfz0vqflNyuDmoXAXPTVtpQ0OgheTvTt7JEvgjtQK4W871AdvifeR4AnbKO4X0kA8uE2Vdlgv00sdKfKfny    '
);
const options = {
  // passing the client secret obtained from the server
  // clientSecret: '{{CLIENT_SECRET}}',
};
const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
