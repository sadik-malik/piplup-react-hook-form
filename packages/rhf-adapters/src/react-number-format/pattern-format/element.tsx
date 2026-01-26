import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { PatternFormat, type PatternFormatProps } from 'react-number-format';
import {
  type UsePatternFormatAdapterProps,
  usePatternFormatAdapter,
} from './adapter';

export interface PatternFormatElementProps<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      PatternFormatProps,
      'defaultValue' | 'name' | 'pattern' | 'style'
    >,
    Omit<
      UsePatternFormatAdapterProps<TTransformedValue, TFieldValues, TName>,
      'onBlur' | 'onValueChange'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    PatternFormatProps['onValueChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function PatternFormatComponent<
  TTransformedValue extends null | number | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: PatternFormatElementProps<TTransformedValue, TFieldValues, TName>,
): React.ReactElement {
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

  const adapter = usePatternFormatAdapter({
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

  return <PatternFormat {...rest} {...adapter} />;
}

export const PatternFormatElement =
  PatternFormatComponent as typeof PatternFormatComponent & {
    displayName?: string;
  };

PatternFormatElement.displayName = 'PatternFormatElement';
