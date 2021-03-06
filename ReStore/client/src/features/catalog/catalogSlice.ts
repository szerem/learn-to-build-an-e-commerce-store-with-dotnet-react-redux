import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { MetaData, Product, ProductParams } from '../../app/model/';
import { RootState } from '../../app/store/configureStore';

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams): URLSearchParams {
  const params = new URLSearchParams();
  params.append('pageNumber', productParams.pageNumber.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);
  if (productParams.searchTerm)
    params.append('searchTerm', productParams.searchTerm);
  if (productParams.brands.length > 0)
    params.append('brands', productParams.brands.toString());
  if (productParams.types.length > 0)
    params.append('types', productParams.types.toString());
  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('catalog/fetchProductsAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    // console.log(response);
    thunkAPI.dispatch(setMetaData(response.medaData));
    return response.items;
  } catch (error: any) {
    console.log(error);
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      console.log(error);
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  'catalog/fetchFiltersAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      console.log(error);
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams(): ProductParams {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'name',
    brands: [],
    types: [],
  };
}

export const catalogStateStatusIdle = 'idle';
export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: 'idle',
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      // console.log({'BBBBBBBBBBB':action});
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'pendingFetchProducts';
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      // console.log(action);
      productAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      // console.log(action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      // console.log(action);
      productAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      // console.log(action);
      state.status = 'idle';
    });

    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = 'pendingFetchFilters';
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      state.status = 'idle';
      // console.log(action.payload);
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
