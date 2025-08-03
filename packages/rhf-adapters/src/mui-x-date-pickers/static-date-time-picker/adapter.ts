import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useUnstableBasePickerAdapter as useBasePickerAdapter, type UseBasePickerAdapterProps } from '../internals';

export interface UseMuiXStaticDateTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'helperText' | 'onBlur' | 'title' | 'validator'
  > {}

export function useMuiXStaticDateTimePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXStaticDateTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const adapter = useBasePickerAdapter(
    {
      ...props,
      onBlur: undefined,
      validator: validateDate,
    },
    ref,
  );

  return adapter;
}
