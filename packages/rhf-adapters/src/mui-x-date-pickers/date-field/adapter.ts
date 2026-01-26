import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseDatePickerAdapter,
  type UseBaseDatePickerAdapterProps,
} from '../internals';

export interface UseMuiXDateFieldAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'title' | 'validationProps' | 'validator'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
}

export function useMuiXDateFieldAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDateFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef } = props;

  const adapter = useUnstableBaseDatePickerAdapter(props, inputRef);

  return {
    ...adapter,
    inputRef: adapter.ref,
    ref,
  };
}
