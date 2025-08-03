import * as React from 'react';
import { type FieldErrors, type FieldError, type FieldValues } from 'react-hook-form';

export type FormErrorParserFn<TFieldValues extends FieldValues = FieldValues> = (
  error?: FieldError | FieldErrors<TFieldValues>
) => React.ReactNode;

export const FormErrorParserContext = React.createContext<FormErrorParserFn | null | undefined>(
  null
);
