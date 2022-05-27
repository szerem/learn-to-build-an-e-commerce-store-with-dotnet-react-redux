import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useAppDispatch } from '../../app/store/configureStore';
import { setBasket } from '../basket/basketSlice';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  'pk_test_51L14yfA61uEThykOfz0vqflNyuDmoXAXPTVtpQ0OgheTvTt7JEvgjtQK4W871AdvifeR4AnbKO4X0kA8uE2Vdlgv00sdKfKfny    '
);
const options = {
  //  passing the client secret obtained from the server
  // clientSecret: '{{CLIENT_SECRET}}',
};
const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.CreatePaymentIntent()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [dispatch]);

  if(loading) return <LoadingComponents message='loading checkout intent...'/>

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage />
    </Elements>
  );
};

export default CheckoutWrapper;
