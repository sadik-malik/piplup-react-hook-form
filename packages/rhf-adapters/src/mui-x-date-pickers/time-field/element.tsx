import * as React from 'react';
import { type PickerValidDate, TimeField, type TimeFieldProps } from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiXTimeFieldAdapterProps, useMuiXTimeFieldAdapter } from './adapter';

export type MuiXTimeFieldElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<
  TimeFieldProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'name' | 'value'
> &
  Omit<
    UseMuiXTimeFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'helperText'
    | 'onBlur'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      TimeFieldProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXTimeFieldComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXTimeFieldElementProps<
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
    helperText,
    inputRef,
    maxTime,
    messages,
    minTime,
    minutesStep,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldDisableTime,
    shouldUnregister,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXTimeFieldAdapter(
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
      helperText,
      inputRef,
      maxTime,
      messages,
      minTime,
      minutesStep,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldDisableTime,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref
  );

  return (
    <TimeField
      {...(rest as TimeFieldProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>)}
      {...adapter}
    />
  );
}

export const MuiXTimeFieldElement = React.forwardRef(
  MuiXTimeFieldComponent
) as typeof MuiXTimeFieldComponent & { displayName?: string };

MuiXTimeFieldElement.displayName = 'MuiXTimeFieldElement';
