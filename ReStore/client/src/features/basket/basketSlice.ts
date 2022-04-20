import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { Basket } from '../../app/model';
import { getCookie } from '../../app/util/util';

export interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: 'idle',
};

interface BasketProps {
  productId: number;
  quantity?: number;
  name?: string;
}

export const addBasketItemAsync = createAsyncThunk<Basket, BasketProps>(
  'basket/addBasketItemAsync',
  async ({ productId, quantity = 1 }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>('basket/removeBasketItemAsync', async ({ productId, quantity }) => {
  try {
    return await agent.Basket.removeItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie('buyerId')) {
        return false;
      }
    },
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      const { productId, name } = action.meta.arg;
      state.status = 'pendingAddItem' + productId + name ?? '';
    });
    // builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
    //   // console.log(action);
    //   state.basket = action.payload;
    //   state.status = 'idle';
    // });
    // builder.addCase(addBasketItemAsync.rejected, (state) => {
    //   state.status = 'idle';
    // });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      const { productId, name } = action.meta.arg;
      state.status = `pendingRemoveItem${productId}${name ?? ''}`;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === undefined || itemIndex === -1) return;

      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket!.items[itemIndex].quantity === 0) {
        state.basket!.items.splice(itemIndex, 1);
      }
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = 'idle';
      }
    );
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, addBasketItemAsync.rejected),
      (state) => {
        state.status = 'idle';
      }
    );
  },
});

export const { setBasket } = basketSlice.actions;
