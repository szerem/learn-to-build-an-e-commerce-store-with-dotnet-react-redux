import { Delete } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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

  if (!basket)
    return <Typography variant="h3"> Your basket is empty</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell align="right">{(row.price / 100).toFixed()}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                {((row.quantity / 100) * row.price).toFixed()}
              </TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketPage;
