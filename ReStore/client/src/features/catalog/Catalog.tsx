import { Button } from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';
import ProductList from './ProductList';

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog: React.FC<Props> = ({ products, addProduct }) => {
  return (
    <>
      <ProductList products={products}></ProductList>
      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
};

export default Catalog;
