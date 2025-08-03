import type * as React from 'react';
import { validateTime, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBasePickerAdapter as useBasePickerAdapter,
  useUnstableComposePickerSlotProps as useComposePickerSlotProps,
  type UseBasePickerAdapterProps,
} from '../internals';

export interface UseMuiXTimePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'helperText'
    | 'maxDate'
    | 'maxDateTime'
    | 'minDate'
    | 'minDateTime'
    | 'onBlur'
    | 'shouldDisableDate'
    | 'shouldDisableMonth'
    | 'shouldDisableYear'
    | 'validator'
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

  const {
    error,
    helperText,
    maxDate: _maxDate,
    maxDateTime: _maxDateTime,
    minDate: _minDate,
    minDateTime: _minDateTime,
    onBlur,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableMonth: _shouldDisableMonth,
    shouldDisableYear: _shouldDisableYear,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      helperText: undefined,
      maxDate: undefined,
      maxDateTime: undefined,
      minDate: undefined,
      minDateTime: undefined,
      onBlur: onClose,
      shouldDisableDate: undefined,
      shouldDisableMonth: undefined,
      shouldDisableYear: undefined,
      validator: validateTime,
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
