import * as React from 'react';
import {
  DateField,
  type DateFieldProps,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXDateFieldAdapterProps,
  useMuiXDateFieldAdapter,
} from './adapter';

export type MuiXDateFieldElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  DateFieldProps<TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'helperText' | 'name' | 'value'
> &
  Omit<
    UseMuiXDateFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'onBlur'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      DateFieldProps<TEnableAccessibleFieldDOMStructure>['onChange'],
      TTransformedValue,
      TFieldValues,
      TName
    >;
  };

function MuiXDateFieldComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = true,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiXDateFieldElementProps<
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
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error,
    errorParser,
    helperText,
    inputRef,
    maxDate,
    messages,
    minDate,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldUnregister,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXDateFieldAdapter(
    {
      classes: undefined,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableFuture,
      disableOnError,
      disableOnIsSubmitting,
      disablePast,
      error,
      errorParser,
      helperText,
      inputRef,
      maxDate,
      messages,
      minDate,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref,
  );

  return <DateField {...rest} {...adapter} />;
}

export const MuiXDateFieldElement = React.forwardRef(
  MuiXDateFieldComponent,
) as typeof MuiXDateFieldComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiXDateFieldElement.displayName = 'MuiXDateFieldElement';
}
