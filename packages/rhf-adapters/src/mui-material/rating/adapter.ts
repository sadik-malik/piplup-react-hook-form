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

export interface UseMuiRatingAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'max' | 'min'
  > {
  max?: number;
  min?: number;
}

export function useMuiRatingAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiRatingAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { transform } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (typeof value === 'undefined') {
          return null as TTransformedValue;
        }
        return value;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: TTransformedValue,
      ): PathValue<TFieldValues, TName> {
        if (typeof value === 'undefined') {
          return null as PathValue<TFieldValues, TName>;
        }
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [],
  );

  const { title: _title, ...adapter } = useControllerAdapter<
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
    ref,
  );

  return {
    ...adapter,
    classes: props.classes,
    max: props.max,
    min: props.min,
  };
}
