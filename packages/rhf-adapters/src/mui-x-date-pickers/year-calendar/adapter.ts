import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseDatePickerAdapter as useBaseDatePickerAdapter,
  type UseBaseDatePickerAdapterProps,
} from '../internals';

export interface UseMuiXYearCalendarAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'title' | 'validator'
  > {}

export function useMuiXYearCalendarAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXYearCalendarAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const adapter = useBaseDatePickerAdapter(props, ref);

  return adapter;
}
