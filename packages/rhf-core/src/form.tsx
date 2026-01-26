import * as React from 'react';
import {
  type FieldValues,
  FormProvider as ReactHookFormProvider,
  type SubmitErrorHandler,
  type UseFormProps,
  useForm,
  type FormProviderProps as ReactHookFormProviderProps,
  type SubmitHandler,
} from 'react-hook-form';
import {
  FormErrorParserContext,
  type FormErrorParserFn,
} from './context/form-error-parser-context';

export interface FormErrorProviderProps {
  children: React.ReactNode;
  errorParser?: FormErrorParserFn;
}

export function FormErrorProvider(props: FormErrorProviderProps) {
  const { children, errorParser } = props;
  return (
    <FormErrorParserContext.Provider value={errorParser}>
      {children}
    </FormErrorParserContext.Provider>
  );
}

interface FormContainerWithoutUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
> extends FormErrorProviderProps {
  formContext: Omit<
    ReactHookFormProviderProps<TFieldValues, TContext, TTransformedValues>,
    'children'
  >;
  formProps?: Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'children' | 'onSubmit'
  >;
  onError?: SubmitErrorHandler<TFieldValues>;
  onSubmit?: SubmitHandler<TTransformedValues>;
}

function FormContainerWithoutUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  props: FormContainerWithoutUseFormProps<
    TFieldValues,
    TContext,
    TTransformedValues
  >,
) {
  const { children, errorParser, formContext, formProps, onError, onSubmit } =
    props;
  return (
    <ReactHookFormProvider {...formContext}>
      <FormErrorProvider errorParser={errorParser}>
        <form
          noValidate
          {...formProps}
          onSubmit={
            typeof onSubmit === 'function'
              ? formContext.handleSubmit(onSubmit, onError)
              : () =>
                  console.warn(
                    'Callback `onValid` is missing from FormContainer.',
                  )
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
  TTransformedValues = TFieldValues,
> extends UseFormProps<TFieldValues, TContext, TTransformedValues>,
    Omit<
      FormContainerWithoutUseFormProps<
        TFieldValues,
        TContext,
        TTransformedValues
      >,
      'formContext'
    > {}

function FormContainerWithUseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  props: FormContainerWithUseFormProps<
    TFieldValues,
    TContext,
    TTransformedValues
  >,
) {
  const {
    children,
    errorParser,
    formProps,
    onError = () => {
      // do nothing
    },
    onSubmit = () => {
      // do nothing
    },
    ...UseFormProps
  } = props;

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
  TTransformedValues = TFieldValues,
> =
  | FormContainerWithoutUseFormProps<TFieldValues, TContext, TTransformedValues>
  | (FormContainerWithUseFormProps<
      TFieldValues,
      TContext,
      TTransformedValues
    > & {
      formContext?: undefined;
    });

export function FormContainer<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues = TFieldValues,
>(props: FormContainerProps<TFieldValues, TContext, TTransformedValues>) {
  const { errorParser, formContext, ...rest } = props;

  if (!formContext) {
    return <FormContainerWithUseForm errorParser={errorParser} {...rest} />;
  }

  return (
    <FormContainerWithoutUseForm
      errorParser={errorParser}
      formContext={formContext}
      {...rest}
    />
  );
}
