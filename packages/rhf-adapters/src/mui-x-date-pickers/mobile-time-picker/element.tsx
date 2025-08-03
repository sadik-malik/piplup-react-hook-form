import * as React from 'react';
import {
  MobileTimePicker,
  type TimeView,
  type MobileTimePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXMobileTimePickerAdapterProps,
  useMuiXMobileTimePickerAdapter,
} from './adapter';

export type MuiXMobileTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<
  MobileTimePickerProps<TTransformedValue, TimeView, TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'name' | 'value'
> &
  Omit<
    UseMuiXMobileTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'helperText'
    | 'internalClasses'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      MobileTimePickerProps<
        TTransformedValue,
        TimeView,
        TEnableAccessibleFieldDOMStructure
      >['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXMobileTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXMobileTimePickerElementProps<
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
    error,
    errorParser,
    inputRef,
    maxTime,
    messages,
    minTime,
    minutesStep,
    name,
    onChange,
    onClose,
    required,
    rules,
    shouldDisableTime,
    shouldUnregister,
    slotProps,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXMobileTimePickerAdapter(
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
      error,
      errorParser,
      inputRef,
      maxTime,
      messages,
      minTime,
      minutesStep,
      name,
      onChange,
      onClose,
      required,
      rules,
      shouldDisableTime,
      shouldUnregister,
      slotProps,
      style,
      timezone,
      transform,
    },
    ref
  );

  return <MobileTimePicker {...rest} {...adapter} />;
}

export const MuiXMobileTimePickerElement = React.forwardRef(
  MuiXMobileTimePickerComponent
) as typeof MuiXMobileTimePickerComponent & { displayName?: string };

MuiXMobileTimePickerElement.displayName = 'MuiXMobileTimePickerElement';
