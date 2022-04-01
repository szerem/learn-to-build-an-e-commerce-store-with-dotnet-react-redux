import { createSlice } from '@reduxjs/toolkit';
import { Basket } from '../../app/model';

export interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === undefined || itemIndex === -1) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket!.items[itemIndex].quantity === 0) {
        state.basket!.items.splice(itemIndex, 1);
      }
      setBasket(state.basket!);
    },
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
