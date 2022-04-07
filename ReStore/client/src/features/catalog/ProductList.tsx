import { Grid } from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {products.map((product, index) => (
        <Grid item xs={4} key={product.id}>
          <ProductCard index={index} product={product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
