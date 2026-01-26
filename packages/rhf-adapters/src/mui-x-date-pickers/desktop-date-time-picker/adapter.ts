import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXDateTimePickerAdapterProps,
  useMuiXDateTimePickerAdapter,
} from '../date-time-picker';

export interface UseMuiXDesktopDateTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseMuiXDateTimePickerAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  > {}

export function useMuiXDesktopDateTimePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDesktopDateTimePickerAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  return useMuiXDateTimePickerAdapter(props, ref);
}
