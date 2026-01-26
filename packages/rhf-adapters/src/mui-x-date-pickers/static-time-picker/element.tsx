import * as React from 'react';
import {
  StaticTimePicker,
  type StaticTimePickerProps,
  type TimePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXStaticTimePickerAdapterProps,
  useMuiXStaticTimePickerAdapter,
} from './adapter';

export type MuiXStaticTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<StaticTimePickerProps, 'defaultValue' | 'name' | 'value'> &
  Omit<
    UseMuiXStaticTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
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
      TimePickerProps['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXStaticTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXStaticTimePickerElementProps<
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
    ...adapter
  } = useMuiXStaticTimePickerAdapter(
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

  return <StaticTimePicker {...rest} {...adapter} />;
}

export const MuiXStaticTimePickerElement = React.forwardRef(
  MuiXStaticTimePickerComponent,
) as typeof MuiXStaticTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXStaticTimePickerElement.displayName = 'MuiXStaticTimePickerElement';
}
