import { Container, Paper, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Ooops - we could not find what you are looking for
      </Typography>
      <Divider />
      <Button fullWidth component={Link}>
        Go back to the shop
      </Button>
    </Container>
  );
};

export default NotFound;
