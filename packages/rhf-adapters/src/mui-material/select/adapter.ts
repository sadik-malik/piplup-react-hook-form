import * as React from 'react';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import {
  type PathValue,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export interface UseMuiSelectAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerAdapterProps<TTransformedValue, TFieldValues, TName> {
  multiple?: boolean;
}

export function useMuiSelectAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiSelectAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { multiple } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (multiple) {
          return (Array.isArray(value) ? value : []) as TTransformedValue;
        }
        return value;
      },
      output(
        event: React.ChangeEvent<HTMLInputElement>,
      ): PathValue<TFieldValues, TName> {
        return event.target.value as PathValue<TFieldValues, TName>;
      },
    }),
    [multiple],
  );

  const adapter = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...props,
      transform: {
        ...transformHelpers,
        ...props.transform,
      },
    },
    ref,
  );
  return {
    ...adapter,
    classes: props.classes,
    multiple,
  };
}
