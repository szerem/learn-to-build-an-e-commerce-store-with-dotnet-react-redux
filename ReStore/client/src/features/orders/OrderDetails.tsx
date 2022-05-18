import { Grid, Button, Typography, Box } from '@mui/material';
import { FC } from 'react';
import { BasketItem } from '../../app/model';
import { Order } from '../../app/model/Order';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderDetails: FC<Props> = ({ order, setSelectedOrder }) => {

  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) ?? 0;
  console.log(subtotal);
      
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Order# {order.id} - {order?.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          BACK TO ORDERS
        </Button>
      </Box>

      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetails;
