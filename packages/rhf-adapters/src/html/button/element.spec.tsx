import * as React from 'react';
import { test, vi, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { HtmlButtonElement } from './element';
import { HtmlInputElement } from '../input';

describe('HtmlButtonElement', () => {
  test('calls provided onClick and does not reset when type is button', async () => {
    const onClick = vi.fn();

    const screen = await render(
      <FormContainer>
        <label>
          Name
          <HtmlInputElement name="name" />
        </label>
        <HtmlButtonElement onClick={onClick} type="button" data-testid="">
          Submit
        </HtmlButtonElement>
      </FormContainer>,
    );

    await screen.getByRole('textbox', { name: 'Name' }).fill('Test');
    await screen.getByRole('button', { name: /submit/i }).click();

    expect(onClick).toHaveBeenCalled();
    await expect.element(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Test');
  });

  test('resets the form when type is reset', async () => {
    const onClick = vi.fn();

    const SubmitForm = () => {
      const { control, handleSubmit } = useForm<{ foo: string }>({
        defaultValues: { foo: 'bar' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <label>
            Input
            <HtmlInputElement control={control} name="foo" data-testid="foo" />
          </label>
          <HtmlButtonElement data-testid="reset" control={control} type="reset" onClick={onClick}>
            Reset
          </HtmlButtonElement>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);
    const input = screen.getByTestId('foo');

    await input.clear();
    await input.fill('baz');
    await screen.getByTestId('reset').click();
    expect(onClick).toHaveBeenCalled();

    await expect.element(input).toHaveValue('bar');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => {
      return (
        <FormContainer>
          <HtmlButtonElement name="my-button">Btn</HtmlButtonElement>
        </FormContainer>
      );
    };

    const screen = await render(<WithName />);
    expect(screen.getByRole('button')).toHaveAttribute('name', 'my-button');
  });

  test('submits the parent form when type is submit', async () => {
    const onSubmit = vi.fn();

    const screen = await render(
      <FormContainer onSubmit={onSubmit}>
        <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
      </FormContainer>,
    );

    await screen.getByRole('button', { name: /submit/i }).click();
    expect(onSubmit).toHaveBeenCalled();
  });
});
