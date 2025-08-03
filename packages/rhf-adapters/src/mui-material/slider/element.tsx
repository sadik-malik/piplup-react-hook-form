import * as React from 'react';
import { type SliderProps, Slider } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiSliderAdapterProps, useMuiSliderAdapter } from './adapter';

export interface MuiSliderElementProps<
  TTransformedValue extends number | number[] = number | number[],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SliderProps, 'defaultValue' | 'name' | 'style'>,
    Omit<
      UseMuiSliderAdapterProps<TTransformedValue, TFieldValues, TName>,
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
  transform?: Transform<SliderProps['onChange'], TTransformedValue, TFieldValues, TName>;
}

function MuiSliderComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends number | number[] = number | number[]
>(
  props: MuiSliderElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: SliderProps['ref']
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

  const { helperText: _helperText, ...adapter } = useMuiSliderAdapter(
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

  return <Slider {...rest} {...adapter} />;
}

export const MuiSliderElement = React.forwardRef(
  MuiSliderComponent
) as typeof MuiSliderComponent & {
  displayName?: string;
};

MuiSliderElement.displayName = 'MuiSliderElement';
