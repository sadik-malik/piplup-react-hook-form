import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '../../html/input/adapter';

export interface UseNumberFormatBaseAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
    'checked' | 'indeterminate' | 'onChange' | 'title' | 'type' | 'value'
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInputRef?: ((el: HTMLInputElement) => void) | React.Ref<any>;
  onValueChange?: (
    // User needs to write their own types for the rest parameters.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  type?: 'password' | 'tel' | 'text';
}

export function useNumberFormatBaseAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseNumberFormatBaseAdapterProps<TTransformedValue, TFieldValues, TName>) {
  const { composeHelperText, getInputRef, onValueChange, transform, type, ...rest } = props;

  const {
    checked: _checked,
    error,
    helperText,
    indeterminate: _indeterminate,
    onChange,
    ref,
    src: _src,
    title: _title,
    type: _type,
    ...adapter
  } = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, Required<typeof getInputRef>>(
    {
      ...rest,
      checked: undefined,
      composeHelperText,
      indeterminate: undefined,
      onChange: onValueChange,
      title: undefined,
      transform: {
        output(values: { value: TTransformedValue }) {
          return values?.value as PathValue<TFieldValues, TName>;
        },
        ...transform,
      },
      type,
      value: undefined,
    },
    getInputRef
  );
  return {
    ...adapter,
    getInputRef: ref,
    onValueChange: onChange,
    type,
    ...(composeHelperText && {
      error,
      helperText,
    }),
  };
}
