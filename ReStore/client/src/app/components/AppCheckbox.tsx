import { FormControlLabel, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
}

const AppCheckbox: FC<Props> = (props: Props) => {
  const { field } = useController({
    ...props
  });
  return (
    <FormControlLabel
      control={<Checkbox color="secondary" {...field} />}
      label={props.label}
    />
  );
};

export default AppCheckbox;
