import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type MuiOtpInputProps } from 'mui-one-time-password-input';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiOtpInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'classes' | 'composeClassName' | 'internalClasses'
  > {
  TextFieldsProps?: MuiOtpInputProps['TextFieldsProps'];
}

interface UseMuiOtpInputAdapterResult<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
> {
  className?: string;
  disabled: boolean;
  helperText: React.ReactNode;
  name: TName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...args: any[]) => void;
  ref?: React.Ref<RefType>;
  required?: boolean;
  style?: React.CSSProperties;
  TextFieldsProps: MuiOtpInputProps['TextFieldsProps'];
  title?: string;
  value: TTransformedValue;
}

export function useMuiOtpInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiOtpInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
): UseMuiOtpInputAdapterResult<TTransformedValue, TFieldValues, TName, RefType> {
  const { TextFieldsProps, transform, ...rest } = props;

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

  const {
    error,
    // ref: adapterRef,
    ...adapter
  } = useControllerAdapter<TTransformedValue, TFieldValues, TName>({
    ...rest,
    classes: undefined,
    composeClassName: false,
    transform: {
      ...internalTransform,
      ...transform,
    },
  });

  return {
    ...adapter,
    ref,
    TextFieldsProps(index: number) {
      // TODO: component stops accepting any user input if inputRef is passed to the component.
      // Enable inputRef once this bug is addressed in `mui-one-time-password-input` package.
      // https://github.com/viclafouch/mui-otp-input/issues/71
      if (typeof TextFieldsProps === 'function') {
        const textFieldsProps = TextFieldsProps(index);
        return {
          ...textFieldsProps,
          error: error || !!textFieldsProps.error,
          // inputRef: forkRef(textFieldsProps.ref, adapterRef),
        };
      }
      return {
        ...TextFieldsProps,
        error: error || !!TextFieldsProps?.error,
        // inputRef: forkRef(TextFieldsProps?.ref, adapterRef),
      };
    },
  };
}
