import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { Order } from '../../app/model/Order';
import { currencyFormat, dateFormat } from '../../app/util/util';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((response) => setOrders(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponents message="Loading orders..." />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order number</TableCell>
            <TableCell align="right">Total </TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">{dateFormat(order.orderDate)}</TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/orders/${order.id}`}
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersPage;