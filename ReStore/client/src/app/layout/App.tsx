import { CssBaseline, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../model/Product';
import Header from './Header';

const App = () => {
  // console.log(`App ${new Date().toISOString()} ...`);

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
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </>
  );
};

export default App;
