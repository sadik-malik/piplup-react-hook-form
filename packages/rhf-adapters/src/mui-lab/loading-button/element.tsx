import * as React from 'react';
import { LoadingButton, type LoadingButtonProps } from '@mui/lab';
import { type FieldValues } from 'react-hook-form';
import { useMuiLoadingButtonAdapter, type UseMuiLoadingButtonAdapterProps } from './adapter';

export interface MuiLoadingButtonElementProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<LoadingButtonProps, 'name' | 'style'>,
    Omit<
      UseMuiLoadingButtonAdapterProps<TFieldValues>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'internalClasses'
      | 'onClick'
    > {}

function MuiLoadingButtonComponent<TFieldValues extends FieldValues = FieldValues>(
  props: MuiLoadingButtonElementProps<TFieldValues>,
  ref?: LoadingButtonProps['ref']
) {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    exact,
    loading,
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
  } = useMuiLoadingButtonAdapter(
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
      exact,
      loading,
      name,
      onClick,
      style,
      type,
    },
    ref
  );

  return <LoadingButton {...rest} {...adapter} />;
}

export const MuiLoadingButtonElement = React.forwardRef(
  MuiLoadingButtonComponent
) as typeof MuiLoadingButtonComponent & { displayName?: string };

MuiLoadingButtonElement.displayName = 'MuiLoadingButtonElement';
