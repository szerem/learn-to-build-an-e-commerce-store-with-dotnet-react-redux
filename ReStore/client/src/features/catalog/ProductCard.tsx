import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { Product } from '../../app/model/Product';
interface Props {
  index: number;
  product: Product;
}

const ProductCard: React.FC<Props> = ({ index, product }) => {
  const [loading, setLoading] = useState(false);

  const handleAddItem = (productId: number) => {
    setLoading(true);
    console.log(`productId=${productId}`);
    agent.Basket.addItem(productId)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' },
        }}
      />
      <CardMedia
        component="img"
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.light',
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          €{(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} size="small" onClick={() => handleAddItem(product.id)}>
          Add to card
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
