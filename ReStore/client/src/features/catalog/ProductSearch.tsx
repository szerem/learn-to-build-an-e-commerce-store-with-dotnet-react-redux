import { debounce, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';

const ProductSearch: React.FC = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1500);
  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ''}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};

export default ProductSearch;
