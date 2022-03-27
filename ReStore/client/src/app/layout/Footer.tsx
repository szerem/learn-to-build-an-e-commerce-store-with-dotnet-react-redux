import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonMailto from './ButtonMailto';

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {`Copyright © ${new Date().getFullYear()} `}
      <ButtonMailto label="szerem™" email="szerem@gmail.com"></ButtonMailto>
    </Typography>
  );
};

export default Footer;
