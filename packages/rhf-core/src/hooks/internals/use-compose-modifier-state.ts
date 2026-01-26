import * as React from 'react';

/**
 * Props for the `useComposeModifierState` hook.
 */
export type UseComposeModifierStateProps = {
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
   * field error state from react hook form
   */
  fieldError?: boolean;

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
export function useUnstableComposeModifierState(
  props: UseComposeModifierStateProps,
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
    const hasError = error ?? fieldError ?? false;
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
