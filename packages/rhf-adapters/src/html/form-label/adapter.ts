import {
  useFieldStateAdapter,
  type UseFieldStateAdapterProps,
} from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseHtmlFormLabelProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseFieldStateAdapterProps<TFieldValues, TName> {}

export function useHtmlFormLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(props: UseHtmlFormLabelProps<TFieldValues, TName>, ref?: React.Ref<RefType>) {
  return useFieldStateAdapter(props, ref);
}
