import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  value: boolean;
}

const AppHiddenInput: FC<Props> = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });
  return <input type="hidden" {...props} {...field} />;
};

export default AppHiddenInput;
