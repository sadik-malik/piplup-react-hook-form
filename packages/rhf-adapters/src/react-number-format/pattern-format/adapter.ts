import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useNumberFormatBaseAdapter,
  type UseNumberFormatBaseAdapterProps,
} from '../number-format-base/adapter';

export interface UsePatternFormatAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseNumberFormatBaseAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  > {}

export function usePatternFormatAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseNumberFormatBaseAdapterProps<
    TTransformedValue,
    TFieldValues,
    TName
  >,
) {
  return useNumberFormatBaseAdapter(props);
}
