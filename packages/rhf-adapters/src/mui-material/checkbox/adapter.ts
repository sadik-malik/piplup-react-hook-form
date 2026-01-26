import * as React from 'react';
import { useFormControl } from '@mui/material';
import {
  type PathValue,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  useHtmlInputAdapter,
  type UseHtmlInputAdapterProps,
} from '../../html/input/adapter';

export interface UseMuiCheckboxAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
    'type'
  > {}

export function useMuiCheckboxAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiCheckboxAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const {
    classes,
    disabled: disabledProp,
    required: requiredProp,
    value,
    ...rest
  } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;
  let required = requiredProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
  }

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return value;
      },
      output(
        event: React.ChangeEvent<HTMLInputElement>,
        _checked: boolean, // TODO: remove this when mui deprecates it
        previousValue: TTransformedValue,
      ): PathValue<TFieldValues, TName> {
        const values = (
          Array.isArray(previousValue) ? previousValue : []
        ).filter((previousVal) => previousVal !== value);
        if (event.target.checked) {
          values.push(value);
        }
        if (values.length === 0) {
          return undefined as PathValue<TFieldValues, TName>;
        }

        return values as PathValue<TFieldValues, TName>;
      },
    }),
    [value],
  );

  const adapter = useHtmlInputAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...rest,
      classes,
      disabled,
      required,
      transform: {
        ...transformHelpers,
        ...rest.transform,
      },
      type: 'checkbox',
      value,
    },
    ref,
  );

  return {
    ...adapter,
    classes,
    value,
  };
}
