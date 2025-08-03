import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';

export interface UseMuiSwitchAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerAdapterProps<TTransformedValue, TFieldValues, TName> {}

export function useMuiSwitchAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiSwitchAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { transform } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return !!value as TTransformedValue;
      },
      output(event: React.ChangeEvent<HTMLInputElement>): PathValue<TFieldValues, TName> {
        return event.target.checked as PathValue<TFieldValues, TName>;
      },
    }),
    []
  );

  const { value, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...props,
      transform: {
        ...transformHelpers,
        ...transform,
      },
    },
    ref
  );

  return {
    ...adapter,
    checked: value,
    classes: props.classes,
  };
}
