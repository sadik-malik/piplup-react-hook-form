import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useUnstableBasePickerAdapter as useBasePickerAdapter, type UseBasePickerAdapterProps } from '../internals';

export interface UseMuiXDateCalendarAdapterProps<
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
    | 'shouldDisableTime'
    | 'title'
    | 'validator'
  > {}

export function useMuiXDateCalendarAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDateCalendarAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    maxDateTime: _maxDateTime,
    maxTime: _maxTime,
    minDateTime: _minDateTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    shouldDisableTime: _shouldDisableTime,
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
      shouldDisableTime: undefined,
      validator: validateDate,
    },
    ref,
  );

  return adapter;
}
