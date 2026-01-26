import * as React from 'react';
import {
  MultiSectionDigitalClock,
  type PickerValidDate,
  type MultiSectionDigitalClockProps,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXMultiSectionDigitalClockAdapterProps,
  useMuiXMultiSectionDigitalClockAdapter,
} from './adapter';

export type MuiXMultiSectionDigitalClockElementProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<MultiSectionDigitalClockProps, 'defaultValue' | 'name' | 'value'> &
  Omit<
    UseMuiXMultiSectionDigitalClockAdapterProps<
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
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      MultiSectionDigitalClockProps['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXMultiSectionDigitalClockComponent<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXMultiSectionDigitalClockElementProps<
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
    required: _required,
    ...adapter
  } = useMuiXMultiSectionDigitalClockAdapter(
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

  return <MultiSectionDigitalClock {...rest} {...adapter} />;
}

export const MuiXMultiSectionDigitalClockElement = React.forwardRef(
  MuiXMultiSectionDigitalClockComponent,
) as typeof MuiXMultiSectionDigitalClockComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXMultiSectionDigitalClockElement.displayName =
    'MuiXMultiSectionDigitalClockElement';
}
