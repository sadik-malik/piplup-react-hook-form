import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { execSequentially } from '@piplup/rhf-core/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBasePickerAdapter as useBasePickerAdapter,
  useUnstableComposePickerSlotProps as useComposePickerSlotProps,
  type UseBasePickerAdapterProps,
} from '../internals';

export interface UseMuiXDatePickerAdapterProps<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'disableIgnoringDatePartForTimeValidation'
    | 'helperText'
    | 'maxDateTime'
    | 'maxTime'
    | 'minDateTime'
    | 'minTime'
    | 'minutesStep'
    | 'onBlur'
    | 'shouldDisableTime'
    | 'title'
    | 'validator'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
  onClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useMuiXDatePickerAdapter<
  TTransformedValue extends PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiXDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, onClose, slotProps } = props;

  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    error,
    helperText,
    maxDateTime: _maxDateTime,
    maxTime: _maxTime,
    minDateTime: _minDateTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    onBlur,
    shouldDisableTime: _shouldDisableTime,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      helperText: undefined,
      maxDateTime: undefined,
      maxTime: undefined,
      minDateTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      onBlur: undefined,
      shouldDisableTime: undefined,
      validator: validateDate,
    },
    inputRef,
  );

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
