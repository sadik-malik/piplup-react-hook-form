import type * as React from 'react';
import { type PickerValidDate } from '@mui/x-date-pickers';
import { execSequentially } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBaseDateTimePickerAdapter as useBaseDateTimePickerAdapter,
  type UseBaseDateTimePickerAdapterProps,
  useUnstableComposePickerSlotProps as useComposePickerSlotProps,
} from '../internals';

export interface UseMuiXDateTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBaseDateTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'helperText' | 'onBlur' | 'title'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
  onClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useMuiXDateTimePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDateTimePickerAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, onClose, slotProps } = props;

  const { error, helperText, onBlur, ...adapter } =
    useBaseDateTimePickerAdapter(props, inputRef);

  const composedSlotProps = useComposePickerSlotProps({
    error,
    helperText,
    onBlur,
    slotProps,
  });

  return {
    ...adapter,
    inputRef: adapter.ref,
    onClose: execSequentially(onBlur, onClose),
    ref,
    slotProps: composedSlotProps,
  };
}
