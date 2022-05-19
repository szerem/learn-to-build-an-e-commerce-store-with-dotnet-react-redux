import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/configureStore';
import { useFormContext } from 'react-hook-form';
import AppHiddenInput from '../../app/components/AppHiddenInput';

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  const { control } = useFormContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}
      
      <AppHiddenInput control={control} name='basketExists' value={!!basket}/>

      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
