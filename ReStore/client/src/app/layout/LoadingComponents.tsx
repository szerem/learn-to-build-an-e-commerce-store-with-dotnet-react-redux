import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface Props {
  message?: string;
}

const LoadingComponents: React.FC<Props> = ({ message = 'Loading...'}) => {
  return (
    <Backdrop open={true} invisible>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: 'center', position: 'flex', top: '60%' }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingComponents;
