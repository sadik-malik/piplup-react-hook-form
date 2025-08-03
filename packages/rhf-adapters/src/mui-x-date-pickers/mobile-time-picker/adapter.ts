import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiXTimePickerAdapter, type UseMuiXTimePickerAdapterProps } from '../time-picker';

export interface UseMuiXMobileTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiXTimePickerAdapterProps<TTransformedValue, TFieldValues, TName> {}

export function useMuiXMobileTimePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXMobileTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  return useMuiXTimePickerAdapter(props, ref);
}
