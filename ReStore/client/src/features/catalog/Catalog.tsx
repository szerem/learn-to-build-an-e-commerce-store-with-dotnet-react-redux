import React, { useEffect } from 'react';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';

interface Props {}

const Catalog: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  if (status.includes('pending'))
    return <LoadingComponents message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
