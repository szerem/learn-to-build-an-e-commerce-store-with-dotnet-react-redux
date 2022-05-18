import React from 'react'
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  // const { basket, status } = useAppSelector((state) => state.basket);
  // const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  console.log(id);
  

  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails