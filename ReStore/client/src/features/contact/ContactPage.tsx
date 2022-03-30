import { Typography, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CounterState,
  decrement,
  DECREMENT_COUNTER,
  increment,
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
        onClick={() => dispatch({ type: DECREMENT_COUNTER, payload: 1 })}
        variant="contained"
        color="error"
      >
        DECREMENT BY 1
      </Button>
      <Button
        onClick={() => dispatch({ type: INCREMENT_COUNTER, payload: 1 })}
        variant="contained"
        color="primary"
      >
        INCREMENT BY 1
      </Button>
      <Button
        onClick={() => dispatch(decrement(5))}
        variant="contained"
        color="warning"
      >
        DECREMENT BY 5
      </Button>
      <Button
        onClick={() => dispatch(increment(5))}
        variant="contained"
        color="info"
      >
        INCREMENT BY 5
      </Button>
    </>
  );
};

export default ContactPage;
