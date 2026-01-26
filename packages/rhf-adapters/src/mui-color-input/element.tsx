import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import {
  MuiColorInput,
  type MuiColorInputValue,
  type MuiColorInputProps,
} from 'mui-color-input';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiColorInputAdapterProps,
  useMuiColorInputAdapter,
} from './adapter';

export interface MuiColorInputElementProps<
  TTransformedValue extends MuiColorInputValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      MuiColorInputProps,
      'checked' | 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'
    >,
    Omit<
      UseMuiColorInputAdapterProps<TTransformedValue, TFieldValues, TName>,
      'composeHelperText' | 'onBlur' | 'onChange' | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    MuiColorInputProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiColorInputComponent<
  TTransformedValue extends MuiColorInputValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiColorInputElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: MuiColorInputProps['ref'],
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
    inputRef,
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

  const adapter = useMuiColorInputAdapter(
    {
      className,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText,
      inputRef,
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
    ref,
  );

  return <MuiColorInput {...rest} {...adapter} />;
}

export const MuiColorInputElement = React.forwardRef(
  MuiColorInputComponent,
) as typeof MuiColorInputComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiColorInputElement.displayName = 'MuiColorInputElement';
}
