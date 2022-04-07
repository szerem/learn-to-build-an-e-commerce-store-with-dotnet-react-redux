import { Box, Divider, Toolbar, Typography } from '@mui/material';
import ButtonMailto from './ButtonMailto';

const Footer = () => {
  return (
    <>
      <Divider />
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography>Contact me:</Typography>
          <ButtonMailto
            label="szerem@gmail.com"
            email="szerem@gmail.com"
          ></ButtonMailto>
        </Box>
        <Box sx={{ p: 2, border: '1px dashed red' }}>
          <Typography align="center">
            {`Copyright © ${new Date().getFullYear()} `}
          </Typography>
        </Box>
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
        <IconButton
        component={Link}
        to="#"
        size="small"
        sx={{ color: 'inherits' }}
        onClick={handleEmailme}
      >
        <MailOutlineIcon />
      </IconButton>
          

        </Box>
      </Toolbar>
    </>
  );
};

export default Footer;
