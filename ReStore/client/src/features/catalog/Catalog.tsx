import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
} from './catalogSlice';
import ProductList from './ProductList';

interface Props {}

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDisc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

const Catalog: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (status.includes('pending'))
    return <LoadingComponents message="Loading products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField label="Search products" variant="outlined" fullWidth />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup name="gender1">
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox name="checkedC" />}
                label={brand}
              />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                key={type}
                control={<Checkbox name="checkedC" />}
                label={type}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Display 1-6 of 20 items</Typography>
          <Pagination color="secondary" size='large' count={20} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
