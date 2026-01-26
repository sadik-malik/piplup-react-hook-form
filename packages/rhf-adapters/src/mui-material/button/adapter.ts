import type * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import {
  useHtmlButtonAdapter,
  type UseHtmlButtonAdapterProps,
} from '../../html/button/adapter';

export interface UseMuiButtonAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
> extends UseHtmlButtonAdapterProps<TFieldValues> {}

export function useMuiButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown,
>(props: UseMuiButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlButtonAdapter<TFieldValues, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
