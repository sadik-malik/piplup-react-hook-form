import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from './adapter';

export interface HtmlInputElementProps<
  TTransformedValue extends number | readonly string[] | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
      React.ComponentProps<'input'>,
      | 'checked'
      | 'defaultChecked'
      | 'defaultValue'
      | 'indeterminate'
      | 'name'
      | 'pattern'
      | 'style'
      | 'value'
    >,
    Omit<
      UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'internalClasses'
      | 'onBlur'
      | 'onChange'
      | 'type'
    > {}

function HtmlInputComponent<
  TTransformedValue extends number | readonly string[] | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HtmlInputElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<HTMLInputElement>
): React.ReactElement {
  const {
    checked,
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    indeterminate,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
    type,
    value,
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useHtmlInputAdapter(
    {
      checked,
      classes,
      className,
      composeClassName: true,
      composeHelperText: false,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText: undefined,
      indeterminate,
      max,
      maxLength,
      messages,
      min,
      minLength,
      name,
      onBlur,
      onChange,
      pattern,
      required,
      rules,
      shouldUnregister,
      style,
      title,
      transform,
      type,
      value,
    },
    ref
  );

  return <input {...rest} {...adapter} />;
}

export const HtmlInputElement = React.forwardRef(
  HtmlInputComponent
) as typeof HtmlInputComponent & {
  displayName?: string;
};

HtmlInputElement.displayName = 'HtmlInputElement';
