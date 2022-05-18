import { FormControlLabel, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

const AppCheckbox: FC<Props> = (props: Props) => {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });
  return (
    <FormControlLabel
      control={
        <Checkbox {...field} color="secondary" disabled={props.disabled} />
      }
      label={props.label}
    />
  );
};

export default AppCheckbox;
