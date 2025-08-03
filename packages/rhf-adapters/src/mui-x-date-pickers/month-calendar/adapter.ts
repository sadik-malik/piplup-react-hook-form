import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useUnstableBasePickerAdapter as useBasePickerAdapter, type UseBasePickerAdapterProps } from '../internals';

export interface UseMuiXMonthCalendarAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'disableIgnoringDatePartForTimeValidation'
    | 'maxDateTime'
    | 'maxTime'
    | 'minDateTime'
    | 'minTime'
    | 'minutesStep'
    | 'shouldDisableDate'
    | 'shouldDisableTime'
    | 'shouldDisableYear'
    | 'title'
    | 'validator'
  > {}

export function useMuiXMonthCalendarAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXMonthCalendarAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    maxDateTime: _maxDateTime,
    maxTime: _maxTime,
    minDateTime: _minDateTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableTime: _shouldDisableTime,
    shouldDisableYear: _shouldDisableYear,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      maxDateTime: undefined,
      maxTime: undefined,
      minDateTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      shouldDisableDate: undefined,
      shouldDisableTime: undefined,
      shouldDisableYear: undefined,
      validator: validateDate,
    },
    ref,
  );

  return adapter;
}
