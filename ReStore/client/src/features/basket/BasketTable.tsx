import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { FC } from 'react';
import { BasketItem } from '../../app/model';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { removeBasketItemAsync, addBasketItemAsync } from './basketSlice';

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable: FC<Props> = ({ items, isBasket }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
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
                {isBasket && (
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
                )}
                {row.quantity}
                {isBasket && (
                  <LoadingButton
                    loading={status === `pendingAddItem${row.productId}`}
                    color="secondary"
                    onClick={() =>
                      dispatch(addBasketItemAsync({ productId: row.productId }))
                    }
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(row.quantity * row.price)}
              </TableCell>
              {isBasket && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
