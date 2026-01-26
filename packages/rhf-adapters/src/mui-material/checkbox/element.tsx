import * as React from 'react';
import { Checkbox, type CheckboxProps } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useMuiCheckboxAdapter,
  type UseMuiCheckboxAdapterProps,
} from './adapter';

export interface MuiCheckboxElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      CheckboxProps,
      'checked' | 'defaultValue' | 'indeterminate' | 'name' | 'style' | 'value'
    >,
    Omit<
      UseMuiCheckboxAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'onBlur'
      | 'onChange'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    CheckboxProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiCheckboxComponent<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiCheckboxElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: CheckboxProps['ref'],
): React.ReactElement {
  const {
    checked,
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    indeterminate,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
    value,
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiCheckboxAdapter<TTransformedValue, TFieldValues, TName>(
    {
      checked,
      classes,
      className,
      composeClassName: false,
      composeHelperText: false,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      indeterminate,
      max,
      maxLength,
      messages,
      min,
      minLength,
      name,
      onBlur,
      onChange,
      pattern,
      required,
      rules,
      shouldUnregister,
      style,
      title,
      transform,
      value,
    },
    ref,
  );

  return <Checkbox {...rest} {...adapter} />;
}

export const MuiCheckboxElement = React.forwardRef(
  MuiCheckboxComponent,
) as typeof MuiCheckboxComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiCheckboxElement.displayName = 'MuiCheckboxElement';
}
