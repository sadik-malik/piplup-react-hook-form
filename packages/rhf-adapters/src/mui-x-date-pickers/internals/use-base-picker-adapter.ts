import * as React from 'react';
import {
  type Validator,
  type PickersTimezone,
} from '@mui/x-date-pickers';
import { type PickerValidValue } from '@mui/x-date-pickers/internals';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import {
  type PathValue,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  type ComposePickerRulesMessages,
  type UseComposePickerRules,
  useUnstableComposePickerRules,
} from './use-compose-picker-rules';

export interface UseBasePickerAdapterProps<
  TTransformedValue extends PickerValidValue,
  TError,
  TValidationProps extends {},
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      UseComposePickerRules<
        TTransformedValue,
        TError,
        TValidationProps,
        TFieldValues,
        TName
      >,
      'messages'
    >,
    Omit<
      UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'max'
      | 'maxLength'
      | 'messages'
      | 'min'
      | 'minLength'
      | 'pattern'
      | 'title'
    > {
  messages?: ComposePickerRulesMessages<TTransformedValue> & {
    required?: string;
  };
  /**
   * If true, the field will be required.
   */
  required?: boolean;
  /**
   * Choose which timezone to use for the value. Example: "default", "system", "UTC", "America/New_York". If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   */
  timezone?: PickersTimezone;
  /**
   * Props to be passed to the validator function.
   */
  validationProps: TValidationProps;
  /**
   * `validateDate`, `validateTime` or `validateDateTime` function for performing date and time related validations.
   */
  validator: Validator<TTransformedValue, TError, TValidationProps>;
}

export function useUnstableBasePickerAdapter<
  TTransformedValue extends PickerValidValue,
  TError,
  TValidationProps extends {},
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseBasePickerAdapterProps<
    TTransformedValue,
    TError,
    TValidationProps,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
) {
  const {
    messages = {},
    rules,
    timezone,
    transform,
    validationProps,
    validator,
  } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return (value ?? null) as TTransformedValue;
      },
      output(value: TTransformedValue): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [],
  );

  const pickerRules = useUnstableComposePickerRules({
    messages,
    rules,
    timezone,
    validationProps,
    validator,
  });

  const { title: _title, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(
    {
      ...props,
      messages,
      rules: pickerRules,
      transform: {
        ...transformHelpers,
        ...transform,
      },
    },
    ref,
  );

  return {
    ...adapter,
    ...validationProps,
    timezone,
  };
}
