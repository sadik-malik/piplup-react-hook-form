import type * as React from 'react';
import { useFormState, type FieldValues, type UseFormStateProps } from 'react-hook-form';
import {
  useUnstableComposeClassName as useComposeClassName,
  type UseComposeClassNameProps,
  useUnstableComposeHelperText as useComposeHelperText,
  type UseComposeHelperTextProps,
  useUnstableComposeModifierState as useComposeModifierState,
  type UseComposeModifierStateProps,
  useUnstableComposeStyle as useComposeStyle,
  type UseComposeStyleProps,
} from './internals';

/**
 * Defines the properties for the `useFormStateAdapter` hook, including component-specific props.
 */
export interface UseFormStateAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends UseFormStateProps<TFieldValues>,
    Omit<UseComposeModifierStateProps, 'fieldError' | 'isSubmitting'>,
    Omit<UseComposeClassNameProps, 'modifierState'>,
    Omit<UseComposeStyleProps, 'modifierState'>,
    Omit<UseComposeHelperTextProps<TFieldValues>, 'fieldError' | 'name'> {}

/**
 * Hook for create a form state adapter.
 *
 * @param props - The properties for the form state adapter hook.
 * @param [ref] - A ref to be forwarded to the component.
 * @returns The adapted props object for the component.
 */
export function useFormStateAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown,
>(props: UseFormStateAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const {
    classes,
    className,
    composeClassName,
    composeHelperText,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    exact,
    helperText,
    name,
    style,
  } = props;

  const { errors, isSubmitting, isValid } = useFormState<TFieldValues>({
    control,
    disabled,
    exact,
    name,
  });

  const modifierState = useComposeModifierState({
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    fieldError: !isValid,
    isSubmitting,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    composeClassName,
    modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const composedHelperText = useComposeHelperText<TFieldValues>({
    composeHelperText,
    errorParser,
    fieldError: errors,
    helperText,
    name,
  });

  const adapter = {
    className: composedClassName,
    disabled: modifierState.disabled,
    error: modifierState.error,
    helperText: composedHelperText,
    name,
    ref,
    style: composedStyle,
  };

  return adapter;
}
