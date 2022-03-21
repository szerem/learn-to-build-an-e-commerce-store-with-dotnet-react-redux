import React, { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { Product } from '../../app/model/Product';
import ProductList from './ProductList';

interface Props {}

const Catalog: React.FC<Props> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponents message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
