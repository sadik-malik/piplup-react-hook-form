import * as React from 'react';
import {
  type FieldValues,
  type FieldError,
  type FieldErrors,
} from 'react-hook-form';

/**
 * Props for the `useComposeModifierState` hook.
 */
export type UseComposeModifierStateProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  /**
   * Flag indicating if the component should be disabled.
   */
  disabled?: boolean;

  /**
   * Flag indicating if the component should be disabled when there is an error.
   */
  disableOnError?: boolean;

  /**
   * Flag indicating if the component should be disabled when the form is submitting.
   */
  disableOnIsSubmitting?: boolean;

  /**
   * Flag indicating if there is an error state.
   */
  error?: boolean;

  /**
   * Error object from form validation, used to determine the error state.
   */
  fieldError?: boolean | FieldError | FieldErrors<TFieldValues>;

  /**
   * Flag indicating if the form is currently submitting.
   */
  isSubmitting?: boolean;
};

/**
 * Result returned by the `useComposeModifierState` hook, containing the composed state flags.
 */
export type UseComposeModifierStateResult = {
  /**
   * Indicates if the component should be disabled based on the provided props and conditions.
   */
  disabled: boolean;

  /**
   * Indicates if there is an error state based on the provided props and conditions.
   */
  error: boolean;
};

/**
 * Hook to compose modifier states based on props like `disableOnError`, `disableOnIsSubmitting`, `disabled`, `error`, and `isSubmitting`.
 *
 * @param props - The properties used to determine the modifier states.
 * @returns The composed modifier state object containing `error` and `disabled` flags.
 */
export function useUnstableComposeModifierState<
  TFieldValues extends FieldValues = FieldValues,
>(
  props: UseComposeModifierStateProps<TFieldValues>,
): UseComposeModifierStateResult {
  const {
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    fieldError,
    isSubmitting,
  } = props;

  return React.useMemo<UseComposeModifierStateResult>(() => {
    const hasError =
      typeof error !== 'undefined'
        ? error
        : typeof fieldError === 'boolean'
          ? fieldError
          : typeof fieldError === 'object' &&
            fieldError !== null &&
            Object.keys(fieldError).length > 0;
    return {
      disabled: !!(
        disabled ||
        (disableOnError && hasError) ||
        (disableOnIsSubmitting && isSubmitting)
      ),
      error: hasError,
    };
  }, [
    error,
    fieldError,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    isSubmitting,
  ]);
}
