import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import {
  MuiOtpInput,
  type MuiOtpInputProps,
} from 'mui-one-time-password-input';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiOtpInputAdapterProps,
  useMuiOtpInputAdapter,
} from './adapter';

export interface MuiOtpInputElementProps<
  TTransformedValue extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      MuiOtpInputProps,
      | 'checked'
      | 'composeHelperText'
      | 'defaultChecked'
      | 'defaultValue'
      | 'name'
      | 'style'
      | 'value'
    >,
    Omit<
      UseMuiOtpInputAdapterProps<TTransformedValue, TFieldValues, TName>,
      'onBlur' | 'onChange' | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    MuiOtpInputProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiOtpInputComponent<
  TTransformedValue extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiOtpInputElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: MuiOtpInputProps['ref'],
): React.ReactElement {
  const {
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    helperText,
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
    TextFieldsProps,
    title,
    transform,
    ...rest
  } = props;

  const { helperText: _helperText, ...adapter } = useMuiOtpInputAdapter(
    {
      className,
      composeHelperText: false,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText,
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
      TextFieldsProps,
      title,
      transform,
    },
    ref,
  );

  return <MuiOtpInput {...rest} {...adapter} />;
}

export const MuiOtpInputElement = React.forwardRef(
  MuiOtpInputComponent,
) as typeof MuiOtpInputComponent & { displayName?: string };

MuiOtpInputElement.displayName = 'MuiOtpInputElement';
