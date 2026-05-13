import * as React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiFormHelperTextElement } from './element';

describe('MuiFormHelperTextElement', () => {
  test('renders children as helper text when no error', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFormHelperTextElement data-testid="helperText" name="helperText">
          Helpful text
        </MuiFormHelperTextElement>
      </FormContainer>,
    );

    const helperText = screen.getByTestId('helperText');
    await expect.element(helperText).toHaveTextContent('Helpful text');
  });

  test('does not render when renderOnError is true and there is no error', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFormHelperTextElement data-testid="helperText" name="missing" renderOnError>
          Should not show
        </MuiFormHelperTextElement>
      </FormContainer>,
    );

    const helperText = screen.getByTestId('helperText');
    await expect.element(helperText).not.toBeInTheDocument();
  });

  test('shows helper text when field has validation error and renderOnError is true', async () => {
    const SubmitForm = () => {
      const { control, handleSubmit, register } = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <input data-cy="name" {...register('name', { required: true })} />
          <MuiFormHelperTextElement
            data-testid="helperText"
            control={control}
            name="name"
            renderOnError
          >
            Required
          </MuiFormHelperTextElement>
          <button type="submit">Submit</button>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);

    await screen.getByRole('button').click();
    const helperText = screen.getByTestId('helperText');
    await expect.element(helperText).toHaveTextContent('Required');
  });

  test('uses provided errorParser to render parsed message', async () => {
    const SubmitForm = () => {
      const methods = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={methods.handleSubmit(() => {})} noValidate>
          <input data-cy="name" {...methods.register('name', { required: true })} />
          <MuiFormHelperTextElement
            control={methods.control}
            data-testid="helperText"
            errorParser={() => 'parsed-message'}
            name="name"
            renderOnError
          >
            Required
          </MuiFormHelperTextElement>
          <button type="submit">Submit</button>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);
    await screen.getByRole('button').click();

    const helperText = screen.getByTestId('helperText');
    await expect.element(helperText).toHaveTextContent('parsed-message');
  });
});
