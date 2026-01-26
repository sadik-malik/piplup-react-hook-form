import * as React from 'react';
import {
  DigitalClock,
  type DigitalClockProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXDigitalClockAdapterProps,
  useMuiXDigitalClockAdapter,
} from './adapter';

export type MuiXDigitalClockElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DigitalClockProps, 'defaultValue' | 'name' | 'value'> &
  Omit<
    UseMuiXDigitalClockAdapterProps<TTransformedValue, TFieldValues, TName>,
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
      DigitalClockProps['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXDigitalClockComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXDigitalClockElementProps<TTransformedValue, TFieldValues, TName>,
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
  } = useMuiXDigitalClockAdapter(
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

  return <DigitalClock {...rest} {...adapter} />;
}

export const MuiXDigitalClockElement = React.forwardRef(
  MuiXDigitalClockComponent,
) as typeof MuiXDigitalClockComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXDigitalClockElement.displayName = 'MuiXDigitalClockElement';
}
