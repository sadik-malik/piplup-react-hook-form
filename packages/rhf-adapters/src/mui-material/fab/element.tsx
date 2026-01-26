import * as React from 'react';
import { Fab, type FabProps } from '@mui/material';
import { type FieldValues } from 'react-hook-form';
import { useMuiFabAdapter, type UseMuiFabAdapterProps } from './adapter';

export interface MuiFabElementProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<FabProps, 'name' | 'onClick' | 'style'>,
    Omit<
      UseMuiFabAdapterProps<TFieldValues>,
      'classes' | 'composeClassName' | 'composeHelperText' | 'helperText'
    > {}

function MuiFabComponent<TFieldValues extends FieldValues = FieldValues>(
  props: MuiFabElementProps<TFieldValues>,
  ref?: FabProps['ref'],
) {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    exact,
    name,
    onClick,
    style,
    type,
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiFabAdapter(
    {
      classes,
      className,
      composeClassName: false,
      composeHelperText: false,
      control,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      exact,
      name,
      onClick,
      style,
      type,
    },
    ref,
  );
  return <Fab {...rest} {...adapter} />;
}

export const MuiFabElement = React.forwardRef(
  MuiFabComponent,
) as typeof MuiFabComponent & {
  displayName?: string;
};

if (process.env.NODE_ENV !== 'production') {
  MuiFabElement.displayName = 'MuiFabElement';
}
