import * as React from 'react';
import {
  type TimeView,
  type Validator,
  type PickersTimezone,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type ComposePickerRulesMessages,
  type UseComposePickerRules,
  useUnstableComposePickerRules,
} from './use-compose-picker-rules';

export interface UseBasePickerAdapterProps<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseComposePickerRules<TTransformedValue, TFieldValues, TName>, 'messages'>,
    Omit<
      UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
      'max' | 'maxLength' | 'messages' | 'min' | 'minLength' | 'pattern' | 'title'
    > {
  /**
   * If true, disable values after the current date.
   */
  disableFuture?: boolean;
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation?: boolean;
  /**
   * 'If true, disable values before the current date.'
   */
  disablePast?: boolean;
  /**
   * Maximum selectable date.
   */
  maxDate?: TTransformedValue;
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use maxTime.
   */
  maxDateTime?: TTransformedValue;
  /**
   * Maximum selectable time.
   */
  maxTime?: TTransformedValue;
  /**
   * Customizable rules messages.
   */
  messages?: ComposePickerRulesMessages<TTransformedValue> & {
    required?: string;
  };
  /**
   * Minimal selectable date.
   */
  minDate?: TTransformedValue;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use minTime.
   */
  minDateTime?: TTransformedValue;
  /**
   * Minimal selectable time.
   */
  minTime?: TTransformedValue;
  /**
   * Step over minutes.
   */
  minutesStep?: number;
  /**
   * If true, the field will be required.
   */
  required?: boolean;
  /**
   * Disable specific date.
   */
  shouldDisableDate?: (day: TTransformedValue) => boolean;
  /**
   * Disable specific month.
   */
  shouldDisableMonth?: (month: TTransformedValue) => boolean;
  /**
   * Disable specific time.
   */
  shouldDisableTime?: (value: TTransformedValue, view: TimeView) => boolean;
  /**
   * Disable specific year.
   */
  shouldDisableYear?: (year: TTransformedValue) => boolean;
  /**
   * Choose which timezone to use for the value. Example: "default", "system", "UTC", "America/New_York". If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   */
  timezone?: PickersTimezone;
  /**
   * `validateDate`, `validateTime` or `validateDateTime` function for performing date and time related validations.
   */
  validator: Validator<
    TTransformedValue,
    NonNullable<TTransformedValue>,
    null | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

export function useUnstableBasePickerAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disablePast,
    maxDate,
    maxDateTime,
    maxTime,
    messages = {},
    minDate,
    minDateTime,
    minTime,
    minutesStep,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
    transform,
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
    []
  );

  const pickerRules = useUnstableComposePickerRules({
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disablePast,
    maxDate,
    maxDateTime,
    maxTime,
    messages,
    minDate,
    minDateTime,
    minTime,
    minutesStep,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
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
    ref
  );

  return {
    ...adapter,
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disablePast,
    maxDate,
    maxDateTime,
    maxTime,
    minDate,
    minDateTime,
    minTime,
    minutesStep,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
  };
}
