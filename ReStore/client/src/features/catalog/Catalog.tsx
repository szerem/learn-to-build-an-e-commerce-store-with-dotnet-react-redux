import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog: React.FC<Props> = ({ products, addProduct }) => {
  return (
    <>
      <List>
        {products.map((item, index) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.pictureUrl} />
            </ListItemAvatar>
            <ListItemText>
              {index + 1}) {item.name} - {item.price}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant='contained' onClick={addProduct}>Add product</Button>
    </>
  );
};

export default Catalog;
