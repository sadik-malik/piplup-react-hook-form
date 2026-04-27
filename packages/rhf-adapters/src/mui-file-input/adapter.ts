import * as React from 'react';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from '@piplup/rhf-core';
import {
  type PathValue,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export type MuiFileInputValue<
  Multiple extends boolean | undefined = undefined,
> = Multiple extends true ? File[] : File | null;

export interface UseMuiFileInputAdapterProps<
  Multiple extends boolean | undefined = undefined,
  TTransformedValue extends MuiFileInputValue<Multiple> =
    MuiFileInputValue<Multiple>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
  | 'classes'
  | 'composeClassName'
  | 'internalClasses'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'pattern'
  | 'title'
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any>;
  multiple?: Multiple;
}

export function useMuiFileInputAdapter<
  Multiple extends boolean | undefined = undefined,
  TTransformedValue extends MuiFileInputValue<Multiple> =
    MuiFileInputValue<Multiple>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiFileInputAdapterProps<Multiple, TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, multiple, transform, ...rest } = props;

  const internalTransform = React.useMemo<
    Exclude<
      UseControllerAdapterProps<
        TTransformedValue,
        TFieldValues,
        TName
      >['transform'],
      undefined
    >
  >(
    () => ({
      input(fileOrFiles: PathValue<TFieldValues, TName>) {
        if (multiple) {
          return (
            Array.isArray(fileOrFiles) ? fileOrFiles : []
          ) as unknown as TTransformedValue;
        }
        return (fileOrFiles ?? null) as TTransformedValue;
      },
      output(fileOrFiles: TTransformedValue) {
        return fileOrFiles as PathValue<TFieldValues, TName>;
      },
    }),
    [multiple],
  );

  const {
    ref: adapterRef,
    title: _title,
    ...adapter
  } = useControllerAdapter<TTransformedValue, TFieldValues, TName>(
    {
      ...rest,
      classes: undefined,
      composeClassName: false,
      max: undefined,
      maxLength: undefined,
      min: undefined,
      minLength: undefined,
      pattern: undefined,
      title: undefined,
      transform: {
        ...internalTransform,
        ...transform,
      },
    },
    inputRef,
  );
  return {
    ...adapter,
    inputRef: adapterRef,
    multiple,
    ref,
  };
}
