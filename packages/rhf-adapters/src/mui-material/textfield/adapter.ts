import type * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useHtmlInputAdapter,
  type UseHtmlInputAdapterProps,
} from '../../html/input/adapter';

export interface UseMuiTextFieldAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any>;
}

export function useMuiTextFieldAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiTextFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, ...rest } = props;
  const { ref: adapterRef, ...adapter } = useHtmlInputAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(rest, inputRef);
  return {
    ...adapter,
    classes: props.classes,
    inputRef: adapterRef,
    ref,
  };
}
