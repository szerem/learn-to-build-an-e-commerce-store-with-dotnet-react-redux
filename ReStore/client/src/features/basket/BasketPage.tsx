import { Delete, Remove, Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
import BasketSummary from './BasketSummary';

interface Props {}

const BasketPage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant="h3"> Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(row.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status === `pendingRemoveItem${row.productId}rem`}
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: 1,
                          name: 'rem',
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={status === `pendingAddItem${row.productId}`}
                    color="secondary"
                    onClick={() =>
                      dispatch(addBasketItemAsync({ productId: row.productId }))
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(row.quantity * row.price)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status === `pendingRemoveItem${row.productId}del`}
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: row.quantity,
                          name: 'del',
                        })
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
