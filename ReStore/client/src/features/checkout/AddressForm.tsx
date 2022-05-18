import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AppTextInput from '../../app/components/AppTextInput';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

export default function AddressForm() {
  const { control, handleSubmit } = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppTextInput control={control} name="fullName" label="Full name" />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="address1"
              label="Address line 1"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="address2"
              label="Address line 2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="city" label="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="state"
              label="State/Province/Region"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="zip"
              label="Zip / Postal code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="country" label="Country" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Button type="submit">Submit form</Button>
      </form>
    </>
  );
}
