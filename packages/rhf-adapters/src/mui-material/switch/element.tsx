import * as React from 'react';
import { Switch, type SwitchProps } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiSwitchAdapterProps, useMuiSwitchAdapter } from './adapter';

export interface MuiSwitchElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SwitchProps, 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'>,
    Omit<
      UseMuiSwitchAdapterProps<TTransformedValue, TFieldValues, TName>,
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
  transform?: Transform<SwitchProps['onChange'], TTransformedValue, TFieldValues, TName>;
}

function MuiSwitchComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends boolean = boolean
>(
  props: MuiSwitchElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: SwitchProps['ref']
): React.ReactElement {
  const {
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
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
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiSwitchAdapter(
    {
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
    },
    ref
  );

  return <Switch {...rest} {...adapter} />;
}

export const MuiSwitchElement = React.forwardRef(
  MuiSwitchComponent
) as typeof MuiSwitchComponent & { displayName?: string };

MuiSwitchElement.displayName = 'MuiSwitchElement';
