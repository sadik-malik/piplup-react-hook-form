import * as React from 'react';
import {
  YearCalendar,
  type YearCalendarProps,
} from '@mui/x-date-pickers';
import { type PickerValidValue } from '@mui/x-date-pickers/internals';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXYearCalendarAdapterProps,
  useMuiXYearCalendarAdapter,
} from './adapter';

export type MuiXYearCalendarElementProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  YearCalendarProps,
  'defaultValue' | 'maxDate' | 'minDate' | 'name' | 'value'
> &
  Omit<
    UseMuiXYearCalendarAdapterProps<TTransformedValue, TFieldValues, TName>,
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
      YearCalendarProps['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXYearCalendarComponent<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXYearCalendarElementProps<TTransformedValue, TFieldValues, TName>,
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
    error,
    errorParser,
    maxDate,
    messages,
    minDate,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldDisableYear,
    shouldUnregister,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXYearCalendarAdapter(
    {
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
      error,
      errorParser,
      maxDate,
      messages,
      minDate,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldDisableYear,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref,
  );

  return <YearCalendar {...rest} {...adapter} />;
}

export const MuiXYearCalendarElement = React.forwardRef(
  MuiXYearCalendarComponent,
) as typeof MuiXYearCalendarComponent & { displayName?: string };

MuiXYearCalendarElement.displayName = 'MuiXYearCalendarElement';
