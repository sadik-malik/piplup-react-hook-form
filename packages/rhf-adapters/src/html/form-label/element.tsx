import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlFormLabelAdapter, type UseHtmlFormLabelProps } from './adapter';

export interface HtmlFormLabelElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<'label'>, 'style'>,
    Omit<
      UseHtmlFormLabelProps<TFieldValues, TName>,
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'internalClasses'
    > {}

function HtmlFormLabelComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: HtmlFormLabelElementProps<TFieldValues, TName>,
  ref?: React.Ref<HTMLLabelElement>,
): React.ReactElement {
  const {
    className,
    disabled,
    ref: adapterRef,
    style,
  } = useHtmlFormLabelAdapter(
    {
      ...props,
      composeClassName: true,
      composeHelperText: false,
    },
    ref,
  );

  return (
    <label
      aria-disabled={disabled}
      {...props}
      className={className}
      htmlFor={props.htmlFor}
      ref={adapterRef}
      style={style}
    />
  );
}

export const HtmlFormLabelElement = React.forwardRef(
  HtmlFormLabelComponent,
) as typeof HtmlFormLabelComponent & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  HtmlFormLabelElement.displayName = 'HtmlFormLabelElement';
}
