import type * as React from 'react';
import { validateTime, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useUnstableBasePickerAdapter as useBasePickerAdapter, type UseBasePickerAdapterProps } from '../internals';

export interface UseMuiXDigitalClockAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'maxDate'
    | 'maxDateTime'
    | 'minDate'
    | 'minDateTime'
    | 'onBlur'
    | 'shouldDisableDate'
    | 'shouldDisableMonth'
    | 'shouldDisableYear'
    | 'validator'
  > {}

export function useMuiXDigitalClockAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDigitalClockAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    maxDate: _maxDate,
    maxDateTime: _maxDateTime,
    minDate: _minDate,
    minDateTime: _minDateTime,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableMonth: _shouldDisableMonth,
    shouldDisableYear: _shouldDisableYear,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      maxDate: undefined,
      maxDateTime: undefined,
      minDate: undefined,
      minDateTime: undefined,
      onBlur: undefined,
      shouldDisableDate: undefined,
      shouldDisableMonth: undefined,
      shouldDisableYear: undefined,
      validator: validateTime,
    },
    ref,
  );

  return adapter;
}
