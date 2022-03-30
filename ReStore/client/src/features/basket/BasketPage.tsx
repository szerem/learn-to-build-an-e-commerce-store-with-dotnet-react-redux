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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';
import BasketSummary from './BasketSummary';

interface Props {}

const BasketPage: React.FC<Props> = () => {
  const { basket, removeItem, setBasket } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: '',
  });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch(console.log)
      .finally(() => setStatus({ loading: false, name: '' }));
  };
  const handleRemoveItem = (productId: number, name: string, quantity = 1) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(console.error)
      .finally(() => setStatus({ loading: false, name: '' }));
  };

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
                <TableCell align="right">
                  {currencyFormat(row.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading && status.name === `remove${row.productId}`
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItem(row.productId, `remove${row.productId}`)
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === `add${row.productId}`
                    }
                    color="secondary"
                    onClick={() =>
                      handleAddItem(row.productId, `add${row.productId}`)
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
                    loading={
                      status.loading &&
                      status.name === `removeAll${row.productId}`
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItem(
                        row.productId,
                        `removeAll${row.productId}`,
                        row.quantity
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
            to ="/checkout"
            variant='contained'
            size='large'
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
