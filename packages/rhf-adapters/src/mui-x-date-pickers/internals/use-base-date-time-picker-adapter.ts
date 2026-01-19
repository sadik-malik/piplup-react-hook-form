import type * as React from 'react';
import {
  usePickerAdapter,
  validateDateTime,
  type ValidateDateTimeProps,
  type DateTimeValidationError,
} from '@mui/x-date-pickers';
import { applyDefaultDate, type PickerValidValue, useDefaultDates } from '@mui/x-date-pickers/internals';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBasePickerAdapter as useBasePickerAdapter,
  type UseBasePickerAdapterProps,
} from '../internals';

type ValidationProps = Omit<
  ValidateDateTimeProps,
  'disableFuture' | 'disablePast'
> &
  Partial<Pick<ValidateDateTimeProps, 'disableFuture' | 'disablePast'>>;


export interface UseBaseDateTimePickerAdapterProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ValidationProps,
    Omit<
      UseBasePickerAdapterProps<
        TTransformedValue,
        DateTimeValidationError,
        ValidationProps,
        TFieldValues,
        TName
      >,
      'validationProps' | 'validator'
    > {}

export function useUnstableBaseDateTimePickerAdapter<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseBaseDateTimePickerAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const {
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disablePast,
    maxDate,
    maxTime,
    minDate,
    minTime,
    minutesStep,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
  } = props;

  const pickerAdapter = usePickerAdapter();
  const defaultDates = useDefaultDates();

  const adapter = useBasePickerAdapter(
    {
      ...props,
      validationProps: {
        disableFuture: disableFuture ?? false,
        disableIgnoringDatePartForTimeValidation,
        disablePast: disablePast ?? false,
        maxDate: applyDefaultDate(pickerAdapter, maxDate, defaultDates.maxDate),
        maxTime,
        minDate: applyDefaultDate(pickerAdapter, minDate, defaultDates.minDate),
        minTime,
        minutesStep,
        shouldDisableDate,
        shouldDisableMonth,
        shouldDisableTime,
        shouldDisableYear,
      },
      validator: validateDateTime,
    },
    ref,
  );

  return adapter
}
