import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiChipsInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'internalClasses'
    | 'max'
    | 'maxLength'
    | 'min'
    | 'minLength'
    | 'pattern'
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any>;
}

export function useMuiChipsInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiChipsInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, transform, ...rest } = props;

  const internalTransform = React.useMemo<
    Exclude<
      UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>['transform'],
      undefined
    >
  >(
    () => ({
      input(value: PathValue<TFieldValues, TName>) {
        return value as TTransformedValue;
      },
      output(value: TTransformedValue) {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [],
  );

  const { ref: adapterRef, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(
    {
      ...rest,
      classes: undefined,
      composeClassName: false,
      max: undefined,
      maxLength: undefined,
      min: undefined,
      minLength: undefined,
      pattern: undefined,
      transform: {
        ...internalTransform,
        ...transform,
      },
    },
    inputRef,
  );
  return {
    ...adapter,
    inputRef: adapterRef,
    ref,
  };
}
