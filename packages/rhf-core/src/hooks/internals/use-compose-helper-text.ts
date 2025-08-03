import * as React from 'react';
import {
  type FieldErrors,
  type FieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { FormErrorParserContext, type FormErrorParserFn } from '../../context';

/**
 * The default error parser function that extracts the message from a given error object.
 *
 * @param [error] - The error object to parse.
 * @returns The parsed error message, or `null` if no message is available.
 */
function defaultErrorParser<TFieldValues extends FieldValues = FieldValues>(
  error?: FieldError | FieldErrors<TFieldValues>
) {
  const message = error?.message;
  if (typeof message === 'string') {
    return message;
  }
  return null;
}

/**
 * Props for the `useComposeHelperText` hook.
 */
export type UseComposeHelperTextProps<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * Flag to determine whether to compose helper text based on error state.
   */
  composeHelperText?: boolean;

  /**
   * Custom error parser function for formatting error messages.
   * If not provided, the default error parser is used.
   */
  errorParser?: FormErrorParserFn;

  /**
   * Error object from form validation that may contain error details.
   */
  fieldError?: FieldError | FieldErrors<TFieldValues>;

  /**
   * The helper text to be displayed when there is no error message.
   */
  helperText?: React.ReactNode;
  /**
   * Name of the field
   */
  name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[];
};

/**
 * A custom hook that determines the appropriate helper text to display based on error states and context.
 *
 * @param props - The properties for composing the helper text.
 * @returns The composed helper text or error message based on the current state.
 */
export function useUnstableComposeHelperText<TFieldValues extends FieldValues = FieldValues>(
  props: UseComposeHelperTextProps<TFieldValues>
): React.ReactNode {
  const {
    composeHelperText,
    errorParser = defaultErrorParser,
    fieldError,
    helperText,
    name,
  } = props;

  const context = React.useContext(
    FormErrorParserContext as React.Context<FormErrorParserFn<TFieldValues>>
  );

  const parser = context && typeof context === 'function' ? context : errorParser;

  if (!composeHelperText) {
    return helperText;
  }

  let errors = fieldError;
  if (name && typeof errors !== 'undefined') {
    if (Array.isArray(name)) {
      errors = Object.fromEntries(
        Object.entries(errors).filter(([key]) => name.some((fieldName) => fieldName === key))
      ) as FieldErrors<TFieldValues>;
    } else {
      errors = fieldError as FieldError;
    }
  }

  const errorMessage = typeof parser === 'function' ? parser(errors) : undefined;

  if (errors && errorMessage) {
    return errorMessage;
  }

  return helperText;
}
