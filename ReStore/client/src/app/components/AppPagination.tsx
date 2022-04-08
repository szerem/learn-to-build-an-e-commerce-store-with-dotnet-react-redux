import { Box, Typography, Pagination } from '@mui/material';
import React from 'react';
import { MetaData } from '../model';

interface Params {
  metaData: MetaData;
  onPageChnage: (page: number) => void;
}

const AppPagination: React.FC<Params> = ({ metaData, onPageChnage }) => {
  const { currentPage, totalPages, pageSize, totalCount } = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Display {(currentPage - 1) * pageSize + 1} -{' '}
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{' '}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChnage(page)}
      />
    </Box>
  );
};

export default AppPagination;
