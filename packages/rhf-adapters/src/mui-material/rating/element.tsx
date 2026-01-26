import * as React from 'react';
import { Rating, type RatingProps } from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiRatingAdapter, type UseMuiRatingAdapterProps } from './adapter';

export interface MuiRatingElementProps<
  TTransformedValue extends null | number,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<RatingProps, 'defaultValue' | 'name' | 'style'>,
    Omit<
      UseMuiRatingAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'max'
      | 'onBlur'
      | 'onChange'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    RatingProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiRatingComponent<
  TTransformedValue extends null | number,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiRatingElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: RatingProps['ref'],
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
  } = useMuiRatingAdapter(
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
    ref,
  );

  return <Rating {...rest} {...adapter} />;
}

export const MuiRatingElement = React.forwardRef(
  MuiRatingComponent,
) as typeof MuiRatingComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiRatingElement.displayName = 'MuiRatingElement';
}
