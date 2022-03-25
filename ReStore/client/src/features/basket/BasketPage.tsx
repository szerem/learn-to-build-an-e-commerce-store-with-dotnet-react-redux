import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { Basket } from '../../app/model';

interface Props {}

const BasketPage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | undefined>(undefined);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));    
  }, []);

  if (loading) return <LoadingComponents message="Loading basket..." />;
  
  if (!basket) return <Typography variant='h3'> Your basket is empty</Typography>

  return <h1>basket id is {basket.buyerId} </h1>;
};

export default BasketPage;
