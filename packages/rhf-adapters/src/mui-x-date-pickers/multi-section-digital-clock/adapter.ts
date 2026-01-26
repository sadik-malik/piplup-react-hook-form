import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseTimePickerAdapter as useBaseTimePickerAdapter,
  type UseBaseTimePickerAdapterProps,
} from '../internals';

export interface UseMuiXMultiSectionDigitalClockAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'validator'
  > {}

export function useMuiXMultiSectionDigitalClockAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXMultiSectionDigitalClockAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const adapter = useBaseTimePickerAdapter(
    {
      ...props,
      onBlur: undefined,
    },
    ref,
  );

  return adapter;
}
