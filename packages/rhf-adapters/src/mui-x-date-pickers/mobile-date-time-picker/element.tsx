import * as React from 'react';
import {
  MobileDateTimePicker,
  type MobileDateTimePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useMuiXMobileDateTimePickerAdapter,
  type UseMuiXMobileDateTimePickerAdapterProps,
} from './adapter';

export interface MuiXMobileDateTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      MobileDateTimePickerProps<TEnableAccessibleFieldDOMStructure>,
      'defaultValue' | 'name' | 'value'
    >,
    Omit<
      UseMuiXMobileDateTimePickerAdapterProps<
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
    MobileDateTimePickerProps<TEnableAccessibleFieldDOMStructure>['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXMobileDateTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXMobileDateTimePickerElementProps<
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

  const adapter = useMuiXMobileDateTimePickerAdapter(
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

  return <MobileDateTimePicker {...rest} {...adapter} />;
}

export const MuiXMobileDateTimePickerElement = React.forwardRef(
  MuiXMobileDateTimePickerComponent,
) as typeof MuiXMobileDateTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXMobileDateTimePickerElement.displayName =
    'MuiXDesktopDateTimePickerElement';
}
