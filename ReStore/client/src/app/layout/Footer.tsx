import { Typography } from '@mui/material';
import ButtonMailto from './ButtonMailto';

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {`Copyright © ${new Date().getFullYear()} `}
        <ButtonMailto label="szerem" email="szerem@gmail.com"></ButtonMailto>
        {`™`}
      </Typography>
    </footer>
  );
};

export default Footer;
