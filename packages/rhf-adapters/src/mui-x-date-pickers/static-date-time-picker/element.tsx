import * as React from 'react';
import {
  StaticDateTimePicker,
  type StaticDateTimePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXStaticDateTimePickerAdapterProps,
  useMuiXStaticDateTimePickerAdapter,
} from './adapter';

export interface MuiXStaticDateTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<StaticDateTimePickerProps, 'defaultValue' | 'name' | 'value'>,
    Omit<
      UseMuiXStaticDateTimePickerAdapterProps<
        TTransformedValue,
        TFieldValues,
        TName
      >,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'maxDate'
      | 'minDate'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    StaticDateTimePickerProps['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXStaticDateTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXStaticDateTimePickerElementProps<
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
    disableIgnoringDatePartForTimeValidation,
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error: errorProp,
    errorParser,
    maxDate,
    maxTime,
    messages,
    minDate,
    minTime,
    minutesStep,
    name,
    onChange,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
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
  } = useMuiXStaticDateTimePickerAdapter(
    {
      classes: undefined,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableFuture,
      disableIgnoringDatePartForTimeValidation,
      disableOnError,
      disableOnIsSubmitting,
      disablePast,
      error: errorProp,
      errorParser,
      maxDate,
      maxTime,
      messages,
      minDate,
      minTime,
      minutesStep,
      name,
      onChange,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableTime,
      shouldDisableYear,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref,
  );

  return <StaticDateTimePicker {...rest} {...adapter} />;
}

export const MuiXStaticDateTimePickerElement = React.forwardRef(
  MuiXStaticDateTimePickerComponent,
) as typeof MuiXStaticDateTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXStaticDateTimePickerElement.displayName =
    'MuiXStaticDateTimePickerElement';
}
