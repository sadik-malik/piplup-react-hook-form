import type React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '../input';

export interface UseHtmlTextareaAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
    'checked' | 'indeterminate' | 'type' | 'value'
  > {}

export function useHtmlTextareaAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseHtmlTextareaAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    checked: _checked,
    indeterminate: _indeterminate,
    src: _src,
    ...adapter
  } = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName>(
    {
      ...props,
      checked: undefined,
      indeterminate: undefined,
      type: 'text',
      value: undefined,
    },
    ref
  );

  return adapter;
}
