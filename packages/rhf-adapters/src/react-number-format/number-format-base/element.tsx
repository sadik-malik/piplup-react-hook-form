import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { NumberFormatBase, type NumberFormatBaseProps } from 'react-number-format';
import { type UseNumberFormatBaseAdapterProps, useNumberFormatBaseAdapter } from './adapter';

export interface NumberFormatBaseElementProps<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<NumberFormatBaseProps, 'defaultValue' | 'name' | 'pattern' | 'style'>,
    Omit<
      UseNumberFormatBaseAdapterProps<TTransformedValue, TFieldValues, TName>,
      'onBlur' | 'onValueChange'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    NumberFormatBaseProps['onValueChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function NumberFormatBaseComponent<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: NumberFormatBaseElementProps<TTransformedValue, TFieldValues, TName>): React.ReactElement {
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

  const adapter = useNumberFormatBaseAdapter({
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

  return <NumberFormatBase {...rest} {...adapter} />;
}

export const NumberFormatBaseElement =
  NumberFormatBaseComponent as typeof NumberFormatBaseComponent & {
    displayName?: string;
  };

NumberFormatBaseElement.displayName = 'NumberFormatBaseElement';
