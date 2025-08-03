import * as React from 'react';
import {
  type DatePickerProps,
  type PickerValidDate,
  type DateTimePickerProps,
  DateTimePicker,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiXDateTimePickerAdapterProps, useMuiXDateTimePickerAdapter } from './adapter';

export interface MuiXDateTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
      DateTimePickerProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>,
      'defaultValue' | 'name' | 'value'
    >,
    Omit<
      UseMuiXDateTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'internalClasses'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    DatePickerProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXDateTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXDateTimePickerElementProps<
    TTransformedValue,
    TEnableAccessibleFieldDOMStructure,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<HTMLDivElement>
): React.ReactElement {
  const {
    className,
    control,
    defaultValue,
    disabled,
    disableFuture,
    disableIgnoringDatePartForTimeValidation,
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error: errorProp,
    errorParser,
    inputRef,
    maxDate,
    maxDateTime,
    maxTime,
    messages,
    minDate,
    minDateTime,
    minTime,
    minutesStep,
    name,
    onChange,
    onClose,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    shouldUnregister,
    slotProps,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXDateTimePickerAdapter(
    {
      classes: undefined,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableFuture,
      disableIgnoringDatePartForTimeValidation,
      disableOnError,
      disableOnIsSubmitting,
      disablePast,
      error: errorProp,
      errorParser,
      inputRef,
      maxDate,
      maxDateTime,
      maxTime,
      messages,
      minDate,
      minDateTime,
      minTime,
      minutesStep,
      name,
      onChange,
      onClose,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableTime,
      shouldDisableYear,
      shouldUnregister,
      slotProps,
      style,
      timezone,
      transform,
    },
    ref
  );

  return <DateTimePicker {...rest} {...adapter} />;
}

export const MuiXDateTimePickerElement = React.forwardRef(
  MuiXDateTimePickerComponent
) as typeof MuiXDateTimePickerComponent & { displayName?: string };

MuiXDateTimePickerElement.displayName = 'MuiXDateTimePickerElement';
