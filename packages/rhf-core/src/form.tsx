import * as React from 'react';
import {
  type FieldValues,
  FormProvider as ReactHookFormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormProps,
  useForm,
  type FormProviderProps as ReactHookFormProviderProps,
} from 'react-hook-form';
import {
  FormErrorParserContext,
  type FormErrorParserFn,
} from './context/form-error-parser-context';

export interface FormErrorProviderProps {
  children: React.ReactNode;
  errorParser?: FormErrorParserFn;
}

export function FormErrorProvider(props: FormErrorProviderProps){
  const { children, errorParser } = props;
  return <FormErrorParserContext.Provider value={errorParser}>{children}</FormErrorParserContext.Provider>
}

interface FormContainerWithoutUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends FormErrorProviderProps {
  formContext: Omit<
    ReactHookFormProviderProps<TFieldValues, TContext, TTransformedValues>,
    'children'
  >;
  formProps?: Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'>;
  onError?: SubmitErrorHandler<TFieldValues>;
  onSubmit?: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
      ? SubmitHandler<TTransformedValues>
      : never;
}

function FormContainerWithoutUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props: FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const { children, errorParser, formContext, formProps, onError, onSubmit } = props;
  return (
    <ReactHookFormProvider {...formContext}>
      <FormErrorProvider errorParser={errorParser}>
        <form
          noValidate
          {...formProps}
          onSubmit={
            typeof onSubmit === 'function'
              ? formContext.handleSubmit(onSubmit, onError)
              : () => console.warn('Callback `onValid` is missing from FormContainer.')
          }
        >
          {children}
        </form>
      </FormErrorProvider>
    </ReactHookFormProvider>
  );
}

interface FormContainerWithUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends UseFormProps<TFieldValues, TContext>,
    Omit<
      FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>,
      'formContext'
    > {}

function FormContainerWithUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props: FormContainerWithUseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const { children, errorParser, formProps, onError, onSubmit, ...UseFormProps } = props;

  const formContext = useForm<TFieldValues, TContext, TTransformedValues>({
    ...UseFormProps,
  });

  return (
    <FormContainerWithoutUseForm
      errorParser={errorParser}
      formContext={formContext}
      formProps={formProps}
      onError={onError}
      onSubmit={onSubmit}
    >
      {children}
    </FormContainerWithoutUseForm>
  );
}

export type FormContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> =
  | FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>
  | (FormContainerWithUseFormProps<TFieldValues, TContext, TTransformedValues> & {
      formContext?: undefined;
    });

export function FormContainer<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props: FormContainerProps<TFieldValues, TContext, TTransformedValues>) {
  const { errorParser, formContext, ...rest } = props;

  if (!formContext) {
    return <FormContainerWithUseForm errorParser={errorParser} {...rest} />;
  }

  return (
    <FormContainerWithoutUseForm errorParser={errorParser} formContext={formContext} {...rest} />
  );
}
