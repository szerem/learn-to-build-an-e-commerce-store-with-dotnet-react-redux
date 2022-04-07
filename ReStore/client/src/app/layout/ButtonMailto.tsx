import { IconButton, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  email: string;
  label: string;
}

const ButtonMailto: React.FC<Props> = ({ email, label }) => {
  const handleEmailme = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <>
      <IconButton
        component={Link}
        to="#"
        size="small"
        sx={{ color: 'inherits' }}
        onClick={handleEmailme}
      >
        <MailOutlineIcon />
      </IconButton>
      <Typography
        component={Link}
        to="#"
        sx={{ color: 'inherits', textDecoration: 'none' }}
        onClick={handleEmailme}
      >
        {label}
      </Typography>
    </>
  );
};

export default ButtonMailto;
