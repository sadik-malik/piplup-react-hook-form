import type * as React from 'react';
import { useFormControl } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '../../html/input/adapter';

export type UseMuiRadioAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>, 'type'>;

export function useMuiRadioAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiRadioAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { disabled: disabledProp, required: requiredProp, ...rest } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;
  let required = requiredProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
  }

  const {
    src: _src,
    title: _title,
    type: _type,
    ...adapter
  } = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(
    {
      ...rest,
      disabled,
      required,
      type: 'radio',
    },
    ref
  );

  return adapter;
}
