import * as React from 'react';
import {
  TimeClock,
  type TimeClockProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXTimeClockAdapterProps,
  useMuiXTimeClockAdapter,
} from './adapter';

export type MuiXTimeClockElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TimeClockProps, 'defaultValue' | 'name' | 'value'> &
  Omit<
    UseMuiXTimeClockAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'helperText'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      TimeClockProps['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXTimeClockComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXTimeClockElementProps<TTransformedValue, TFieldValues, TName>,
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
    error,
    errorParser,
    maxTime,
    messages,
    minTime,
    minutesStep,
    name,
    onChange,
    required,
    rules,
    shouldDisableTime,
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
  } = useMuiXTimeClockAdapter(
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
      error,
      errorParser,
      helperText: undefined,
      maxTime,
      messages,
      minTime,
      minutesStep,
      name,
      onChange,
      required,
      rules,
      shouldDisableTime,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref,
  );

  return <TimeClock {...rest} {...adapter} />;
}

export const MuiXTimeClockElement = React.forwardRef(
  MuiXTimeClockComponent,
) as typeof MuiXTimeClockComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXTimeClockElement.displayName = 'MuiXTimeClockElement';
}
