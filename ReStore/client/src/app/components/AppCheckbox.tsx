import { FormControlLabel, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
}

const AppCheckbox: FC<Props> = (props: Props) => {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: false,
  });
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          {...field}
          color="secondary"
          value={field.value}
        />
      }
      label={props.label}
    />
  );
};

export default AppCheckbox;
