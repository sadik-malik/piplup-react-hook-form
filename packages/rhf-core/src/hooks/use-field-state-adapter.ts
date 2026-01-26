import type * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type UseComposeClassNameProps,
  useUnstableComposeClassName as useComposeClassName,
  type UseComposeHelperTextProps,
  useUnstableComposeHelperText as useComposeHelperText,
  type UseComposeModifierStateProps,
  useUnstableComposeModifierState as useComposeModifierState,
  type UseComposeStyleProps,
  useUnstableComposeStyle as useComposeStyle,
} from './internals';
import { useFieldState, type UseFieldStateProps } from './use-field-state';

/**
 * Type for the props of the `useFieldStateAdapter`.
 */
export interface UseFieldStateAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseFieldStateProps<TFieldValues, TName>,
    Omit<UseComposeModifierStateProps, 'fieldError' | 'isSubmitting' | 'name'>,
    Omit<UseComposeClassNameProps, 'modifierState'>,
    Omit<UseComposeStyleProps, 'modifierState'>,
    Omit<UseComposeHelperTextProps, 'fieldError' | 'name'> {}

/**
 * Hook for creating a field state adapter.
 *
 * @param props - The props for the field state adapter.
 * @param [ref] - (Optional) ref for the field state adapter.
 * @returns The adapter object with the composed properties.
 */
export function useFieldStateAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseFieldStateAdapterProps<TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
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
    helperText,
    name,
    style,
  } = props;

  const {
    disabled: disableField,
    error: fieldError,
    invalid,
    isSubmitting,
  } = useFieldState<TFieldValues, TName>({
    control,
    disabled,
    name,
  });

  const modifierState = useComposeModifierState({
    disabled: disableField,
    disableOnError,
    disableOnIsSubmitting,
    error,
    fieldError: invalid,
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
    fieldError,
    helperText,
    name,
  });

  return {
    className: composedClassName,
    disabled: modifierState.disabled,
    error: modifierState.error,
    helperText: composedHelperText,
    ref,
    style: composedStyle,
  };
}
