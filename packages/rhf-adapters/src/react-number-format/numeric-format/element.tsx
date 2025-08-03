import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { type UseNumericFormatAdapterProps, useNumericFormatAdapter } from './adapter';

export interface NumericFormatElementProps<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<NumericFormatProps, 'defaultValue' | 'name' | 'pattern' | 'style'>,
    Omit<
      UseNumericFormatAdapterProps<TTransformedValue, TFieldValues, TName>,
      'onBlur' | 'onValueChange'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    NumericFormatProps['onValueChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function NumericFormatComponent<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: NumericFormatElementProps<TTransformedValue, TFieldValues, TName>): React.ReactElement {
  const {
    classes,
    className,
    composeClassName = true,
    composeHelperText = false,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    getInputRef,
    helperText,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onValueChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    transform,
    type,
    ...rest
  } = props;

  const adapter = useNumericFormatAdapter({
    classes,
    className,
    composeClassName,
    composeHelperText,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    getInputRef,
    helperText,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onValueChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    transform,
    type,
  });

  return <NumericFormat {...rest} {...adapter} />;
}

export const NumericFormatElement = NumericFormatComponent as typeof NumericFormatComponent & {
  displayName?: string;
};

NumericFormatElement.displayName = 'NumericFormatElement';
