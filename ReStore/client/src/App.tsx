import { useEffect, useState } from 'react';

const initializeProducts = [
  { id: 0, name: 'product1', price: 100.0 },
  { id: 1, name: 'product2', price: 200.0 },
];

const App = () => {
  // console.log(`App ${new Date().toISOString()} ...`);

  const [products, setProducts] = useState(initializeProducts);

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
      { id: prev.length + 1, name: `product ${prev.length + 1}`, price: 300.0 },
    ]);
  };

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, index) => (
          <li key={item.id}>
            {index + 1}) {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </div>
  );
};

export default App;
