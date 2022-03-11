import React from 'react';
import { Product } from '../../app/model/Product';

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog: React.FC<Props> = ({ products, addProduct }) => {
  return (
    <>
      <ul>
        {products.map((item, index) => (
          <li key={item.id}>
            {index + 1}) {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>
  );
};

export default Catalog;
