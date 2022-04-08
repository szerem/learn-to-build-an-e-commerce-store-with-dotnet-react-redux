import {
  Box,
  Grid,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

interface Props {}

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

const Catalog: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);
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
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(brands) => dispatch(setProductParams({ brands }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(types) => dispatch(setProductParams({ types }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Display 1-6 of 20 items</Typography>
          <Pagination color="secondary" size="large" count={20} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
