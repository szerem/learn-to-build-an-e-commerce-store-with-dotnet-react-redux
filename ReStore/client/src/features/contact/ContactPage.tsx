import { Typography, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CounterState,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
} from './counterReducer';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">The data is: {data}</Typography>
      <Button
        onClick={() => dispatch({ type: DECREMENT_COUNTER })}
        variant="contained"
        color="error"
      >
        DECREMENT
      </Button>
      <Button
        onClick={() => dispatch({ type: INCREMENT_COUNTER })}
        variant="contained"
        color="primary"
      >
        INCREMENT
      </Button>
    </>
  );
};

export default ContactPage;
