import React, { useEffect, useState } from 'react';
import { Product } from '../../app/model/Product';
import ProductList from './ProductList';

interface Props {
}

const Catalog: React.FC<Props> = () => {


  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log('useEffect ...');
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((err) => console.error(err));
  }, []);

  const addProduct = () => {
    setProducts((prev) => [
      ...products,
      {
        id: prev.length + 1,
        name: `product ${prev.length + 1}`,
        price: 300.0,
        brand: 'same',
        description: '',
      } as Product,
    ]);
  };

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
