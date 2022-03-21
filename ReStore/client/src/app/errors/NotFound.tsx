import { Button, Container, Paper, Typography, Divider} from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant='h3'>Oops - we could not find what you are looking for</Typography>
      <Divider />
      <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
    </Container>
  );
};

export default NotFound;
