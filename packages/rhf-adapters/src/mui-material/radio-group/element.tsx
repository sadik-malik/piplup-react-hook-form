import * as React from 'react';
import { RadioGroup, type RadioGroupProps } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiRadioGroupAdapter, type UseMuiRadioGroupAdapterProps } from './adapter';

export interface MuiRadioGroupElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<RadioGroupProps, 'defaultValue' | 'name' | 'style'>,
    Omit<
      UseMuiRadioGroupAdapterProps<TTransformedValue, TFieldValues, TName>,
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
  transform?: Transform<RadioGroupProps['onChange'], TTransformedValue, TFieldValues, TName>;
}

function MuiRadioGroupComponent<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiRadioGroupElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: RadioGroupProps['ref']
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
  } = useMuiRadioGroupAdapter(
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

  return <RadioGroup {...rest} {...adapter} />;
}

export const MuiRadioGroupElement = React.forwardRef(
  MuiRadioGroupComponent
) as typeof MuiRadioGroupComponent & { displayName?: string };

MuiRadioGroupElement.displayName = 'MuiRadioGroupElement';
