import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiXDatePickerAdapter, type UseMuiXDatePickerAdapterProps } from '../date-picker';

export interface UseMuiXMobileDatePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiXDatePickerAdapterProps<TTransformedValue, TFieldValues, TName> {}

export function useMuiXMobileDatePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXMobileDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  return useMuiXDatePickerAdapter(props, ref);
}
