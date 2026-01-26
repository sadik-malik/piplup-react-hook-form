import * as React from 'react';
import {
  type Control,
  type FieldValues,
  type UseFormReset,
  useFormContext,
} from 'react-hook-form';

/**
 * Defines the properties for the `useFormReset` hook.
 */
export type UseFormResetProps<TFieldValues extends FieldValues = FieldValues> =
  {
    /** The control object from react-hook-form. */
    control?: Control<TFieldValues>;
  };

/**
 * Defines the result type of the `useFormReset` hook.
 */
export type UseFormResetResult<TFieldValues extends FieldValues = FieldValues> =
  UseFormReset<TFieldValues>;

/**
 * Hook to provide a function to reset the form fields.
 *
 * This hook returns a `reset` function that can be used to reset the form values to their default state or to a specific set of values.
 * If a `control` object is provided, it will be used; otherwise, the `control` from the form context will be used.
 *
 * @param {UseFormResetProps<TFieldValues>} props - The properties for the form reset hook.
 * @param {Control<TFieldValues>} [props.control] - The control object from react-hook-form. If not provided, the control from the form context will be used.
 * @returns {UseFormResetResult<TFieldValues>} The `reset` function to reset the form values.
 */
export function useFormReset<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormResetProps<TFieldValues>,
): UseFormResetResult<TFieldValues> {
  const methods = useFormContext<TFieldValues>();

  const { control = methods.control } = props;

  const reset: UseFormReset<TFieldValues> = React.useCallback(
    (formValues, keepStateOptions) => {
      const _reset = control._reset;
      _reset(
        typeof formValues === 'function'
          ? (formValues as (values: TFieldValues) => TFieldValues)(
              control._formValues as TFieldValues,
            )
          : formValues,
        keepStateOptions,
      );
    },
    [control._reset, control._formValues],
  );

  return reset;
}
