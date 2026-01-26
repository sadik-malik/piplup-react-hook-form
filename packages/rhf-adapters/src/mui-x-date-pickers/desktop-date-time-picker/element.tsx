import * as React from 'react';
import {
  type PickerValidDate,
  DesktopDateTimePicker,
  type DesktopDateTimePickerProps,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useMuiXDesktopDateTimePickerAdapter,
  type UseMuiXDesktopDateTimePickerAdapterProps,
} from './adapter';

export interface MuiXDesktopDateTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      DesktopDateTimePickerProps<TEnableAccessibleFieldDOMStructure>,
      'defaultValue' | 'name' | 'value'
    >,
    Omit<
      UseMuiXDesktopDateTimePickerAdapterProps<
        TTransformedValue,
        TFieldValues,
        TName
      >,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'internalClasses'
      | 'maxDate'
      | 'minDate'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    DesktopDateTimePickerProps<TEnableAccessibleFieldDOMStructure>['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXDesktopDateTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXDesktopDateTimePickerElementProps<
    TTransformedValue,
    TEnableAccessibleFieldDOMStructure,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<HTMLDivElement>,
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
    maxTime,
    messages,
    minDate,
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

  const adapter = useMuiXDesktopDateTimePickerAdapter(
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
      maxTime,
      messages,
      minDate,
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
    ref,
  );

  return <DesktopDateTimePicker {...rest} {...adapter} />;
}

export const MuiXDesktopDateTimePickerElement = React.forwardRef(
  MuiXDesktopDateTimePickerComponent,
) as typeof MuiXDesktopDateTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXDesktopDateTimePickerElement.displayName =
    'MuiXDesktopDateTimePickerElement';
}
