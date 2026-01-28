import * as React from 'react';
import {
  Autocomplete,
  type AutocompleteValue,
  type AutocompleteProps,
  type ChipTypeMap,
} from '@mui/material';
import { type Transform } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useMuiAutocompleteAdapter,
  type UseMuiAutocompleteProps,
} from './adapter';

export interface MuiAutocompleteElementProps<
  TTransformedValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
      AutocompleteProps<
        TTransformedValue,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >,
      'defaultValue' | 'renderInput' | 'style' | 'value'
    >,
    Omit<
      UseMuiAutocompleteProps<
        AutocompleteValue<
          TTransformedValue,
          Multiple,
          DisableClearable,
          FreeSolo
        >,
        Multiple,
        TFieldValues,
        TName
      >,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'multiple'
      | 'onBlur'
      | 'onChange'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: Transform<
    AutocompleteProps<
      TTransformedValue,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >['onChange'],
    AutocompleteValue<TTransformedValue, Multiple, DisableClearable, FreeSolo>,
    TFieldValues,
    TName
  >;
}

function MuiAutocompleteComponent<
  TTransformedValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: MuiAutocompleteElementProps<
    TTransformedValue,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<RefType>,
): React.ReactElement {
  const {
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    helperText,
    max,
    maxLength,
    messages,
    min,
    minLength,
    multiple,
    name,
    onBlur,
    onChange,
    pattern,
    renderInput,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
    ...rest
  } = props;

  const adapter = useMuiAutocompleteAdapter(
    {
      classes,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText,
      max,
      maxLength,
      messages,
      min,
      minLength,
      multiple,
      name,
      onBlur,
      onChange,
      pattern,
      renderInput,
      required,
      rules,
      shouldUnregister,
      style,
      title,
      transform
    },
    ref,
  );

  return <Autocomplete {...rest} {...adapter} />;
}

export const MuiAutocompleteElement = React.forwardRef(
  MuiAutocompleteComponent,
) as typeof MuiAutocompleteComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  MuiAutocompleteElement.displayName = 'MuiAutocompleteElement';
}
