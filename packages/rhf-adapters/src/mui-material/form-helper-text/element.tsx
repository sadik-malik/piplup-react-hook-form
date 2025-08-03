import * as React from 'react';
import { FormHelperText, type FormHelperTextProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiFormHelperTextAdapter, type UseMuiFormHelperTextProps } from './adapter';

export interface MuiFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormHelperTextProps, 'style'>,
    Omit<
      UseMuiFormHelperTextProps<TFieldValues, TName>,
      'classes' | 'composeClassName' | 'composeHelperText'
    > {
  /**
   * Render component only, if there is an error
   */
  renderOnError?: boolean;
}

function MuiFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: MuiFormHelperTextElementProps<TFieldValues, TName>, ref?: FormHelperTextProps['ref']) {
  const {
    children,
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    name,
    renderOnError,
    style,
    ...rest
  } = props;

  const adapter = useMuiFormHelperTextAdapter(
    {
      children,
      classes,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      name,
      style,
    },
    ref,
  );

  if (renderOnError && !adapter.error) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <FormHelperText {...rest} {...adapter} />;
}

export const MuiFormHelperTextElement = React.forwardRef(
  MuiFormHelperTextComponent,
) as typeof MuiFormHelperTextComponent & { displayName?: string };

MuiFormHelperTextElement.displayName = 'MuiFormHelperTextElement';
