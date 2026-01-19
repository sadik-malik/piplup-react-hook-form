import type * as React from 'react';
import { type PickerValidValue } from '@mui/x-date-pickers/internals';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXDateTimePickerAdapterProps,
  useMuiXDateTimePickerAdapter,
} from '../date-time-picker';

export interface UseMuiXDesktopDateTimePickerAdapterProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiXDateTimePickerAdapterProps<TTransformedValue, TFieldValues, TName> {}

export function useMuiXDesktopDateTimePickerAdapter<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXDesktopDateTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  return useMuiXDateTimePickerAdapter(props, ref);
}
