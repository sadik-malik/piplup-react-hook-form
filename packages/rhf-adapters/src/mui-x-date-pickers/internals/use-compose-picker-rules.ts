import * as React from 'react';
import {
  type Validator,
  type PickersTimezone,
  type PickerValidDate,
  type TimeView,
} from '@mui/x-date-pickers';
import {
  applyDefaultDate,
  useDefaultDates,
  useLocalizationContext,
} from '@mui/x-date-pickers/internals';
import { getMessage } from '@piplup/rhf-core';
import { type UseControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

/**
 * Customizable rules messages.
 */
export type ComposePickerRulesMessages<TTransformedValue extends null | PickerValidDate> = {
  disableFuture?: ((date: TTransformedValue) => string) | string;
  disablePast?: ((date: TTransformedValue) => string) | string;
  invalidDate?: (date: TTransformedValue) => string;
  maxDate?: ((date: TTransformedValue, maxDate?: TTransformedValue) => string) | string;
  maxTime?: ((date: TTransformedValue, maxTime?: TTransformedValue) => string) | string;
  minDate?: ((date: TTransformedValue, minDate?: TTransformedValue) => string) | string;
  minTime?: ((date: TTransformedValue, minTime?: TTransformedValue) => string) | string;
  minutesStep?: ((date: TTransformedValue, minutesStep?: number) => string) | string;
  shouldDisableDate?: ((date: TTransformedValue) => string) | string;
  shouldDisableMonth?: ((date: TTransformedValue) => string) | string;
  'shouldDisableTime-hours'?: ((date: TTransformedValue) => string) | string;
  'shouldDisableTime-minutes'?: ((date: TTransformedValue) => string) | string;
  'shouldDisableTime-seconds'?: ((date: TTransformedValue) => string) | string;
  shouldDisableYear?: ((date: TTransformedValue) => string) | string;
};

export interface UseComposePickerRules<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
   * Override internal error message with your own custom error message.
   */
  messages?: ComposePickerRulesMessages<TTransformedValue>;
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
   * Validation rules object. Refer react-hook-form documentation [here](https://www.react-hook-form.com/api/usecontroller/controller/).
   */
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
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
   *
   * See the [timezones documentation](https://mui.com/x/react-date-pickers/timezone/) for more details.
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

export function useUnstableComposePickerRules<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseComposePickerRules<TTransformedValue, TFieldValues, TName>) {
  const {
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
    rules: rulesProp = {},
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
    validator,
  } = props;

  const defaultDates = useDefaultDates<TTransformedValue>();

  const errorMessages: Required<NonNullable<ComposePickerRulesMessages<TTransformedValue>>> =
    React.useMemo(
      () => ({
        disableFuture: (date: TTransformedValue) =>
          getMessage(messages?.disableFuture ?? 'Future date is not allowed', date),
        disablePast: (date: TTransformedValue) =>
          getMessage(messages?.disablePast ?? 'Past date is not allowed', date),
        invalidDate: (date: TTransformedValue) =>
          getMessage(messages?.invalidDate ?? 'Date is not a valid date', date),
        maxDate: (date: TTransformedValue) =>
          getMessage(
            messages?.maxDate ?? 'Date should be earlier than the maximum allowed date',
            date,
            maxDate,
          ),
        maxTime: (date: TTransformedValue) =>
          getMessage(
            messages?.maxTime ?? 'Time is earlier than the minimum allowed time',
            date,
            maxTime,
          ),
        minDate: (date: TTransformedValue) =>
          getMessage(
            messages?.minDate ?? 'Date must be later than the minimum allowed date',
            date,
            minDate,
          ),
        minTime: (date: TTransformedValue) =>
          getMessage(
            messages?.minTime ?? 'Time is later than the maximum allowed time',
            date,
            minTime,
          ),
        minutesStep: (date: TTransformedValue) =>
          getMessage(messages?.minutesStep ?? 'Minute step is not valid', date, minutesStep),
        shouldDisableDate: (date: TTransformedValue) =>
          getMessage(messages?.shouldDisableDate ?? 'Date is not allowed', date),
        shouldDisableMonth: (date: TTransformedValue) =>
          getMessage(messages?.shouldDisableMonth ?? 'Month is not allowed', date),
        'shouldDisableTime-hours': (date: TTransformedValue) =>
          getMessage(messages?.['shouldDisableTime-hours'] ?? 'Hour is disabled', date),
        'shouldDisableTime-minutes': (date: TTransformedValue) =>
          getMessage(messages?.['shouldDisableTime-minutes'] ?? 'Minute is disabled', date),
        'shouldDisableTime-seconds': (date: TTransformedValue) =>
          getMessage(messages?.['shouldDisableTime-seconds'] ?? 'Second is disabled', date),
        shouldDisableYear: (date: TTransformedValue) =>
          getMessage(messages?.shouldDisableYear ?? 'Year is not allowed', date),
      }),
      [messages, maxDate, maxTime, minDate, minTime, minutesStep],
    );

  const adapter = useLocalizationContext<NonNullable<TTransformedValue>>();

  const rules: UseControllerProps<TFieldValues, TName>['rules'] = { ...rulesProp };
  if (!rules.validate) {
    if (rules.validate === 'function') {
      const validateFunc = rules.validate;
      rules.validate = {
        validate: validateFunc,
      };
    }
    rules.validate = {
      ...rules.validate,
      internal: (value: TTransformedValue) => {
        if (!value) {
          return true;
        }
        const error = validator({
          adapter,
          props: {
            disableFuture,
            disableIgnoringDatePartForTimeValidation:
              disableIgnoringDatePartForTimeValidation ??
              Boolean(minDateTime || maxDateTime || disablePast || disableFuture),
            disablePast,
            maxDate: applyDefaultDate(adapter.utils, maxDateTime ?? maxDate, defaultDates.maxDate),
            maxTime: maxDateTime ?? maxTime,
            minDate: applyDefaultDate(adapter.utils, minDateTime ?? minDate, defaultDates.minDate),
            minTime: minDateTime ?? minTime,
            minutesStep,
            shouldDisableDate,
            shouldDisableMonth,
            shouldDisableTime,
            shouldDisableYear,
          },
          timezone:
            timezone ??
            (value !== null && adapter.utils.isValid(value as NonNullable<TTransformedValue>)
              ? adapter.utils.getTimezone(value as NonNullable<TTransformedValue>)
              : 'default'),
          value,
        });

        const messageFn =
          error && Object.prototype.hasOwnProperty.call(errorMessages, error)
            ? errorMessages[error as keyof typeof errorMessages]
            : null;
        const message = typeof messageFn === 'function' ? messageFn(value) : '';
        return message || undefined;
      },
    };
  }

  return rules;
}
