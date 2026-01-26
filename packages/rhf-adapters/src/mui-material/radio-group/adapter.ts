import * as React from 'react';
import { useFormControl } from '@mui/material';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import {
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';

export type UseMuiRadioGroupAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>;

export function useMuiRadioGroupAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiRadioGroupAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    disabled: disabledProp,
    required: requiredProp,
    transform,
    ...rest
  } = props;

  const muiFormControl = useFormControl();

  let required = requiredProp;
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

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
        value: string,
      ): PathValue<TFieldValues, TName> {
        if (typeof value === 'undefined' || value === '') {
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
      ...rest,
      disabled,
      required,
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
  };
}
