import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlTextareaAdapter, type UseHtmlTextareaAdapterProps } from './adapter';

export interface HtmlTextareaElementProps<
  TTransformedValue extends number | readonly string[] | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<'textarea'>, 'defaultValue' | 'name' | 'style' | 'type'>,
    Omit<
      UseHtmlTextareaAdapterProps<TTransformedValue, TFieldValues, TName>,
      'composeClassName' | 'composeHelperText' | 'onBlur' | 'onChange'
    > {}

function HtmlTextareaComponent<
  TTransformedValue extends number | readonly string[] | string | undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HtmlTextareaElementProps<TTransformedValue, TFieldValues, TName>,
  ref: React.Ref<HTMLTextAreaElement>
): React.ReactElement {
  const {
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    helperText,
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
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useHtmlTextareaAdapter(
    {
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
      helperText,
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
    },
    ref
  );

  return <textarea {...rest} {...adapter} />;
}

export const HtmlTextareaElement = React.forwardRef(HtmlTextareaComponent);

HtmlTextareaElement.displayName = 'HtmlTextareaElement';
