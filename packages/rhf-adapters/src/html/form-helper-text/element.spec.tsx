/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { HtmlFormHelperTextElement } from './element';
import { HtmlInputElement } from '../input';

describe('HtmlFormHelperTextElement', () => {
  test('renders children as helper text when no error', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlFormHelperTextElement name="helperText">Helpful text</HtmlFormHelperTextElement>
      </FormContainer>,
    );

    await expect(screen.getByText('Helpful text')).toBeInTheDocument();
  });

  test('does not render when renderOnError is true and there is no error', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlFormHelperTextElement name="missing" renderOnError data-testid="helperText">
          Should not show
        </HtmlFormHelperTextElement>
      </FormContainer>,
    );

    await expect.element(screen.getByTestId('helperText')).not.toBeInTheDocument();
  });

  test('shows helper text when field has validation error and renderOnError is true', async () => {
    const SubmitForm = () => {
      const { control, handleSubmit } = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <HtmlInputElement
            control={control}
            name="name"
            required
            messages={{
              required: 'This field is required',
            }}
          />
          <HtmlFormHelperTextElement
            data-testid="helperText"
            control={control}
            name="name"
            renderOnError
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);
    await screen.getByRole('button', { name: /submit/i }).click();
    await expect(screen.getByTestId('helperText')).toHaveTextContent('This field is required');
  });

  test('uses provided errorParser to render parsed message', async () => {
    const SubmitForm = () => {
      const methods = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={methods.handleSubmit(() => {})} noValidate>
          <HtmlInputElement data-testid="name" control={methods.control} name="name" required />
          <HtmlFormHelperTextElement
            control={methods.control}
            errorParser={() => 'parsed-message'}
            name="name"
            renderOnError
          >
            Required
          </HtmlFormHelperTextElement>
          <button type="submit">Submit</button>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);

    await screen.getByRole('button', { name: /submit/i }).click();
    await expect(screen.getByText('parsed-message')).toBeInTheDocument();
  });
});
