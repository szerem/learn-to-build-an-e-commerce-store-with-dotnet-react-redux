import React, { useEffect } from 'react';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';

interface Props {}

const Catalog: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded } = useAppSelector((state) => state.catalog);
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
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
