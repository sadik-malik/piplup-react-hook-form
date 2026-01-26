import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseTimePickerAdapter as useBaseTimePickerAdapter,
  type UseBaseTimePickerAdapterProps,
  useUnstableComposePickerSlotProps as useComposePickerSlotProps,
} from '../internals';

export interface UseMuiXTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'helperText' | 'onBlur'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
  onClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useMuiXTimePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, onClose, slotProps } = props;

  const { error, helperText, onBlur, ...adapter } = useBaseTimePickerAdapter(
    {
      ...props,
      helperText: undefined,
      onBlur: onClose,
    },
    inputRef,
  );

  const composedSlotProps = useComposePickerSlotProps({
    error,
    helperText,
    slotProps,
  });

  return {
    ...adapter,
    inputRef: adapter.ref,
    onClose: onBlur,
    ref,
    slotProps: composedSlotProps,
  };
}
