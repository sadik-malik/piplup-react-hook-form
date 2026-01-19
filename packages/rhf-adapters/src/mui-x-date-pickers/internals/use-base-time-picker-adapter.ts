import type * as React from 'react';
import {
  validateTime,
  type TimeValidationError,
  type ValidateTimeProps,
} from '@mui/x-date-pickers';
import {
  type PickerValidValue,
} from '@mui/x-date-pickers/internals';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useUnstableBasePickerAdapter as useBasePickerAdapter,
  type UseBasePickerAdapterProps,
} from '../internals';

type ValidationProps = Omit<
  ValidateTimeProps,
  'disableFuture' | 'disablePast'
> &
  Partial<Pick<ValidateTimeProps, 'disableFuture' | 'disablePast'>>;

export interface UseBaseTimePickerAdapterProps<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ValidationProps,
    Omit<
      UseBasePickerAdapterProps<
        TTransformedValue,
        TimeValidationError,
        ValidationProps,
        TFieldValues,
        TName
      >,
      'validationProps' | 'validator'
    > {}

export function useUnstableBaseTimePickerAdapter<
  TTransformedValue extends PickerValidValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseBaseTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disablePast,
    maxTime,
    minTime,
    minutesStep,
    shouldDisableTime,
  } = props;

  const adapter = useBasePickerAdapter(
    {
      ...props,
      validationProps: {
        disableFuture: disableFuture ?? false,
        disableIgnoringDatePartForTimeValidation,
        disablePast: disablePast ?? false,
        maxTime,
        minTime,
        minutesStep,
        shouldDisableTime,
      },
      validator: validateTime,
    },
    ref,
  );

  return adapter;
}
