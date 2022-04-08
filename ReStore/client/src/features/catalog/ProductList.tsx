import { Grid } from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {products.map((product, index) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard index={index} product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
