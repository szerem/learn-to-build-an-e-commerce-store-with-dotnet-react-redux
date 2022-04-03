import { LoadingButton } from '@mui/lab';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { Product } from '../../app/model/Product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from '../basket/basketSlice';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(+id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id, item]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = +event.target.value;
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleUpdateCart = () => {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  };

  // debugger;
  if (loading) return <LoadingComponents message="Loading product..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider />
        <Typography variant="h4" color="secoundary">
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes('pendingReomveItem' + product.id)}
              onClick={handleUpdateCart}
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
