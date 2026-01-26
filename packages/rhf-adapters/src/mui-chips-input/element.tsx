import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import { MuiChipsInput } from 'mui-chips-input';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiChipsInputAdapterProps,
  useMuiChipsInputAdapter,
} from './adapter';

type MuiChipsInputProps = React.ComponentProps<typeof MuiChipsInput>;

export interface MuiChipsInputElementProps<
  TTransformedValue extends string[],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      MuiChipsInputProps,
      'checked' | 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'
    >,
    Omit<
      UseMuiChipsInputAdapterProps<TTransformedValue, TFieldValues, TName>,
      'composeHelperText' | 'onBlur' | 'onChange' | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    MuiChipsInputProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiChipsInputComponent<
  TTransformedValue extends string[],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiChipsInputElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: MuiChipsInputProps['ref'],
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
    messages,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
    ...rest
  } = props;

  const adapter = useMuiChipsInputAdapter(
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
      messages,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldUnregister,
      style,
      title,
      transform,
    },
    ref,
  );

  return <MuiChipsInput {...(rest as MuiChipsInputProps)} {...adapter} />;
}

export const MuiChipsInputElement = React.forwardRef(
  MuiChipsInputComponent,
) as typeof MuiChipsInputComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiChipsInputElement.displayName = 'MuiChipsInputElement';
}
