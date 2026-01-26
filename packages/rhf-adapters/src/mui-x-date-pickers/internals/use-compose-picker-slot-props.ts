import type * as React from 'react';
import { execSequentially } from '@piplup/utils';

export interface UseComposePickerSlotProps {
  error: boolean;
  helperText: React.ReactNode;
  onBlur?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useUnstableComposePickerSlotProps(
  props: UseComposePickerSlotProps,
) {
  const { error, helperText, onBlur, slotProps } = props;
  return {
    ...slotProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    textField(ownerState: Record<string, any>) {
      let textFieldProps = slotProps ? slotProps.textField : {};
      if (typeof textFieldProps === 'function') {
        textFieldProps = textFieldProps(ownerState);
      }

      return {
        ...textFieldProps,
        error: error || !!textFieldProps?.error,
        helperText: helperText || textFieldProps?.helperText,
        onBlur: execSequentially(onBlur, textFieldProps?.onBlur),
      };
    },
  };
}
