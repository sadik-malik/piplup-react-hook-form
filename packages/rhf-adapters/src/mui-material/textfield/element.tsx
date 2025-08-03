import * as React from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiTextFieldAdapter, type UseMuiTextFieldAdapterProps } from './adapter';

export interface MuiTextFieldElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      TextFieldProps,
      'checked' | 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'
    >,
    Omit<
      UseMuiTextFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'onBlur'
      | 'onChange'
      | 'transform'
      | 'type'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<TextFieldProps['onChange'], TTransformedValue, TFieldValues, TName>;
}

function MuiTextFieldComponent<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiTextFieldElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: TextFieldProps['ref'],
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
    errorParser,
    helperText,
    indeterminate,
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
    type,
    ...rest
  } = props;

  const { src, ...adapter } = useMuiTextFieldAdapter(
    {
      checked,
      classes,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText,
      indeterminate,
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
      type,
    },
    ref,
  );

  return (
    <TextField
      {...rest}
      {...adapter}
      slotProps={{
        ...rest.slotProps,
        htmlInput: {
          ...rest.slotProps?.htmlInput,
          src,
        },
      }}
    />
  );
}

export const MuiTextFieldElement = React.forwardRef(
  MuiTextFieldComponent,
) as typeof MuiTextFieldComponent & { displayName?: string };

MuiTextFieldElement.displayName = 'MuiTextFieldElement';
