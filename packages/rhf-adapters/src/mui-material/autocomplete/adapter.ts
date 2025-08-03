import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiAutocompleteProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerAdapterProps<TTransformedValue, TFieldValues, TName> {
  multiple?: boolean;
}

export function useMuiAutocompleteAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiAutocompleteProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { defaultValue = props.multiple ? [] : null, multiple, transform } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (multiple) {
          return (Array.isArray(value) ? value : []) as TTransformedValue;
        }
        return (typeof value !== 'undefined' ? value : null) as TTransformedValue;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: TTransformedValue
      ): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [multiple]
  );

  const adapter = useControllerAdapter<TTransformedValue, TFieldValues, TName>(
    {
      defaultValue: defaultValue as PathValue<TFieldValues, TName>,
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
    classes: props.classes,
  };
}
