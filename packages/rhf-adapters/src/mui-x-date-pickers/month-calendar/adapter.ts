import type * as React from 'react';
import { type PickerValidValue } from '@mui/x-date-pickers/internals';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseDatePickerAdapter as useBaseDatePickerAdapter,
  type UseBaseDatePickerAdapterProps,
} from '../internals';

export interface UseMuiXMonthCalendarAdapterProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'title'
  > {}

export function useMuiXMonthCalendarAdapter<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXMonthCalendarAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const adapter = useBaseDatePickerAdapter(props, ref);

  return adapter;
}
