import * as React from 'react';
import { FormLabel, type FormLabelProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiFormLabelAdapterProps, useMuiFormLabelAdapter } from './adapter';

export interface MuiFormLabelElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormLabelProps, 'name' | 'style'>,
    Omit<
      UseMuiFormLabelAdapterProps<TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'helperText'
    > {}

function MuiFormLabelComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiFormLabelElementProps<TFieldValues, TName>,
  ref?: FormLabelProps['ref']
): React.ReactElement {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    name,
    style,
    ...rest
  } = props;

  const { helperText: _helperText, ...adapter } = useMuiFormLabelAdapter(
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
      name,
      style,
    },
    ref
  );

  return <FormLabel {...rest} {...adapter} />;
}

export const MuiFormLabelElement = React.forwardRef(
  MuiFormLabelComponent
) as typeof MuiFormLabelComponent & { displayName?: string };

MuiFormLabelElement.displayName = 'MuiFormLabelElement';
