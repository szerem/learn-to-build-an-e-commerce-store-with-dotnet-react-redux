import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { decrement, increment } from './counterSlice';

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">The data is: {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="error"
        >
          DECREMENT BY 1
        </Button>
        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          INCREMENT BY 1
        </Button>

        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="info"
        >
          INCREMENT BY 5
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ContactPage;
