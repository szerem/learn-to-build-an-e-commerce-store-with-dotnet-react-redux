import { List } from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <List>
      {products.map((product, index) => (
        <ProductCard index={index} product={product}></ProductCard>
      ))}
    </List>
  );
};

export default ProductList;
