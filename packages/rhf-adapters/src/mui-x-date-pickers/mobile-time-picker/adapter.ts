import type * as React from 'react';
import { type PickerValidValue } from '@mui/x-date-pickers/internals';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiXTimePickerAdapter, type UseMuiXTimePickerAdapterProps } from '../time-picker';

export interface UseMuiXMobileTimePickerAdapterProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiXTimePickerAdapterProps<TTransformedValue, TFieldValues, TName> {}

export function useMuiXMobileTimePickerAdapter<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXMobileTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  return useMuiXTimePickerAdapter(props, ref);
}
