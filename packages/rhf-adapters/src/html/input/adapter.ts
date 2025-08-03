import * as React from 'react';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

function isEqualRadioOrCheckboxValue(a: unknown, b: unknown) {
  if (typeof a === 'object' && b !== null) {
    return a === b;
  }
  // The DOM can stringify numeric or boolean value so converting values to string for comparison.
  return String(a) === String(b);
}

export interface UseHtmlInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerAdapterProps<TTransformedValue, TFieldValues, TName> {
  checked?: (values: TTransformedValue) => boolean;
  indeterminate?: (values: TTransformedValue) => boolean;
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | string;
  value?: TTransformedValue;
}

export function useHtmlInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    checked,
    indeterminate,
    messages: messagesProp,
    pattern: patternProp,
    type,
    value,
  } = props;

  let pattern = patternProp;
  let messages = messagesProp;
  if (typeof pattern === 'undefined') {
    if (type === 'email') {
      pattern = /\S+@\S+\.\S+/;
      messages = {
        pattern: 'Please enter an email address.',
        ...messages,
      };
    } else if (type === 'url') {
      messages = {
        pattern: 'Please enter a valid url.',
        ...messages,
      };
    }
  }

  React.useMemo(() => {
    if (type === 'checkbox' && typeof value === 'undefined') {
      throw new Error(`\`value\` prop is required when using type as "${type}".`);
    }
  }, [value, type]);

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (type === 'file') {
          // In React, an <input type="file" /> is always an uncontrolled component because its value
          // can only be set by a user, and not programmatically.
          // https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
          return undefined as TTransformedValue;
        } else if (typeof value === 'undefined') {
          return '' as TTransformedValue;
        }
        return value;
      },
      output(
        event: React.ChangeEvent<HTMLInputElement>,
        previousValue: TTransformedValue
      ): PathValue<TFieldValues, TName> {
        switch (type) {
          case 'checkbox': {
            const values = (Array.isArray(previousValue) ? previousValue : []).filter(
              (previousVal) => previousVal !== value
            );
            if (event.target.checked) {
              values.push(value);
            }
            if (values.length === 0) {
              return undefined as PathValue<TFieldValues, TName>;
            }
            return values as PathValue<TFieldValues, TName>;
          }
          case 'radio': {
            return (event.target.checked ? event.target.value : null) as PathValue<
              TFieldValues,
              TName
            >;
          }
          case 'file': {
            return event.target.files as PathValue<TFieldValues, TName>;
          }
          case 'number': {
            if (event.target.value === null || event.target.value === '') {
              return null as PathValue<TFieldValues, TName>;
            }
            return +event.target.value as PathValue<TFieldValues, TName>;
          }
          default:
            return event.target.value as PathValue<TFieldValues, TName>;
        }
      },
    }),
    [type, value]
  );

  const adapter = useControllerAdapter(
    {
      ...props,
      messages,
      pattern,
      transform: {
        ...transformHelpers,
        ...props.transform,
      },
    },
    ref
  );

  const isChecked = React.useMemo(() => {
    if (typeof checked === 'function') {
      return checked(adapter.value);
    }

    if (type === 'radio') {
      return isEqualRadioOrCheckboxValue(adapter.value, value);
    }

    return Array.isArray(adapter.value)
      ? adapter.value.some((val) => {
          return isEqualRadioOrCheckboxValue(val, value);
        })
      : false;
  }, [type, value, adapter.value, checked]);

  const isIndeterminate = React.useMemo(() => {
    if (typeof indeterminate === 'function') {
      return indeterminate(adapter.value);
    }
    return indeterminate;
  }, [indeterminate, adapter.value]);

  return {
    ...adapter,
    type,
    ...(type === 'image' && {
      src: adapter.value?.toString(),
    }),
    ...(type === 'checkbox' && {
      indeterminate: isIndeterminate,
    }),
    ...((type === 'checkbox' || type === 'radio') && {
      checked: isChecked,
      ...(typeof value !== 'undefined' && {
        value,
      }),
    }),
  };
}
