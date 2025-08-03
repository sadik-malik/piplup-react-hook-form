import type * as React from 'react';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core/html';
import { useFormState, type FieldValues } from 'react-hook-form';

export interface UseMuiLoadingButtonAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends UseHtmlButtonAdapterProps<TFieldValues> {
  loading?: boolean;
}

export function useMuiLoadingButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown
>(props: UseMuiLoadingButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const { control, disabled, exact, loading: loadingProp, name } = props;

  const adapter = useHtmlButtonAdapter<TFieldValues, RefType>(props, ref);

  const { isSubmitting } = useFormState<TFieldValues>({
    control,
    disabled,
    exact,
    name,
  });

  let loading = loadingProp;
  if (typeof loading === 'undefined') {
    loading = isSubmitting;
  }

  return {
    ...adapter,
    classes: props.classes,
    loading,
  };
}
