import * as React from 'react';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import {
  type FieldValues,
  type FieldPath,
  type PathValue,
} from 'react-hook-form';

export interface UseMuiSliderAdapterProps<
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

export function useMuiSliderAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiSliderAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    defaultValue,
    max = 100, // Keep this same as default value in [mui](https://mui.com/material-ui/api/slider/#slider-prop-max)
    min = 0, // Keep this same as default value in [mui](https://mui.com/material-ui/api/slider/#slider-prop-min)
    transform,
  } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return (
          typeof value !== 'undefined' ? value : (defaultValue ?? min)
        ) as TTransformedValue;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: TTransformedValue,
      ): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [defaultValue, min],
  );

  const adapter = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...props,
      max,
      min,
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
