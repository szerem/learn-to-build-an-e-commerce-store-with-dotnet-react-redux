import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Product } from '../../app/model/Product';

interface Props {
  index: number;
  product: Product;
}

const ProductCard: React.FC<Props> = ({ index, product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="http://picsum.photos/200"
        title="C"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    // <ListItem key={product.id}>
    //   <ListItemAvatar>
    //     <Avatar src={product.pictureUrl} />
    //   </ListItemAvatar>
    //   <ListItemText>
    //     {index + 1}) {product.name} - {product.price}
    //   </ListItemText>
    // </ListItem>
  );
};

export default ProductCard;
