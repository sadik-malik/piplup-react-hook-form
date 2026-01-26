import * as React from 'react';
import {
  StaticDatePicker,
  type StaticDatePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXStaticDatePickerAdapterProps,
  useMuiXStaticDatePickerAdapter,
} from './adapter';

export interface MuiXStaticDatePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      StaticDatePickerProps,
      'defaultValue' | 'maxDate' | 'minDate' | 'name' | 'value'
    >,
    Omit<
      UseMuiXStaticDatePickerAdapterProps<
        TTransformedValue,
        TFieldValues,
        TName
      >,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    StaticDatePickerProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXStaticDatePickerComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXStaticDatePickerElementProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<HTMLDivElement>,
): React.ReactElement {
  const {
    className,
    control,
    defaultValue,
    disabled,
    disableFuture,
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error: errorProp,
    errorParser,
    maxDate,
    messages,
    minDate,
    name,
    onChange,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldUnregister,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    required: _required,

    ...adapter
  } = useMuiXStaticDatePickerAdapter(
    {
      classes: undefined,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableFuture,
      disableOnError,
      disableOnIsSubmitting,
      disablePast,
      error: errorProp,
      errorParser,
      maxDate,
      messages,
      minDate,
      name,
      onChange,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref,
  );

  return <StaticDatePicker {...rest} {...adapter} />;
}

export const MuiXStaticDatePickerElement = React.forwardRef(
  MuiXStaticDatePickerComponent,
) as typeof MuiXStaticDatePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXStaticDatePickerElement.displayName = 'MuiXStaticDatePickerElement';
}
