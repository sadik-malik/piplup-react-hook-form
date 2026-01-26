import * as React from 'react';
import {
  TimePicker,
  type TimePickerProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXTimePickerAdapterProps,
  useMuiXTimePickerAdapter,
} from './adapter';

export type MuiXTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  TimePickerProps<TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'name' | 'value'
> &
  Omit<
    UseMuiXTimePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'helperText'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      TimePickerProps<TEnableAccessibleFieldDOMStructure>['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXTimePickerElementProps<
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

  const adapter = useMuiXTimePickerAdapter(
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
    ref,
  );

  return <TimePicker {...rest} {...adapter} />;
}

export const MuiXTimePickerElement = React.forwardRef(
  MuiXTimePickerComponent,
) as typeof MuiXTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXTimePickerElement.displayName = 'MuiXTimePickerElement';
}
