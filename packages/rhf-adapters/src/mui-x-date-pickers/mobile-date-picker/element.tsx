import * as React from 'react';
import {
  type PickerValidDate,
  type MobileDatePickerProps,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseMuiXMobileDatePickerAdapterProps,
  useMuiXMobileDatePickerAdapter,
} from './adapter';

export interface MuiXMobileDatePickerElementProps<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
      MobileDatePickerProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>,
      'defaultValue' | 'maxDate' | 'minDate' | 'name' | 'value'
    >,
    Omit<
      UseMuiXMobileDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'internalClasses'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    MobileDatePickerProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>['onChange'],
    TTransformedValue,
    TFieldValues,
    TName
  >;
}

function MuiXMobileDatePickerComponent<
  TTransformedValue extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXMobileDatePickerElementProps<
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
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error: errorProp,
    errorParser,
    inputRef,
    maxDate,
    messages,
    minDate,
    name,
    onChange,
    onClose,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldUnregister,
    slotProps,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXMobileDatePickerAdapter(
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
      error: errorProp,
      errorParser,
      inputRef,
      maxDate,
      messages,
      minDate,
      name,
      onChange,
      onClose,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldUnregister,
      slotProps,
      style,
      timezone,
      transform,
    },
    ref
  );

  return <MobileDatePicker {...rest} {...adapter} />;
}

export const MuiXMobileDatePickerElement = React.forwardRef(
  MuiXMobileDatePickerComponent
) as typeof MuiXMobileDatePickerComponent & { displayName?: string };

MuiXMobileDatePickerElement.displayName = 'MuiXMobileDatePickerElement';
