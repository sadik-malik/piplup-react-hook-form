import * as React from 'react';
import {
  DesktopTimePicker,
  type PickerValidDate,
  type TimePickerProps,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXDesktopTimePickerAdapterProps,
  useMuiXDesktopTimePickerAdapter,
} from './adapter';

export type MuiXDesktopTimePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  TimePickerProps<TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'name' | 'value'
> &
  Omit<
    UseMuiXDesktopTimePickerAdapterProps<
      TTransformedValue,
      TFieldValues,
      TName
    >,
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

function MuiXDesktopTimePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXDesktopTimePickerElementProps<
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

  const adapter = useMuiXDesktopTimePickerAdapter(
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

  return <DesktopTimePicker {...rest} {...adapter} />;
}

export const MuiXDesktopTimePickerElement = React.forwardRef(
  MuiXDesktopTimePickerComponent,
) as typeof MuiXDesktopTimePickerComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXDesktopTimePickerElement.displayName = 'MuiXDesktopTimePickerElement';
}
