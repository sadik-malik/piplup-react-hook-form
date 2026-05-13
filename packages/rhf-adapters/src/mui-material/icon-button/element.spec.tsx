/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiIconButtonElement } from './element';
import { HtmlInputElement } from '../../html';
import { userEvent } from 'vitest/browser';

describe('MuiIconButtonElement', () => {
  test('calls provided onClick and does not reset when type is button', async () => {
    const onClick = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiIconButtonElement onClick={(e) => onClick(e)} type="button">
          Icon
        </MuiIconButtonElement>
      </FormContainer>,
    );

    const button = screen.getByRole('button');
    await button.click();

    await expect(onClick).toHaveBeenCalled();
  });

  test('resets the form when type is reset', async () => {
    const SubmitForm = () => {
      const { control, handleSubmit } = useForm<{ foo: string }>({
        defaultValues: { foo: 'bar' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <HtmlInputElement data-testid="foo" placeholder="foo" name="foo" control={control} />
          <MuiIconButtonElement control={control} type="reset">
            Reset
          </MuiIconButtonElement>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);

    const input = screen.getByTestId('foo');
    await userEvent.clear(input);
    await userEvent.type(input, 'changed');

    await screen.getByRole('button').click();
    await expect.element(input).toHaveValue('bar');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => {
      return (
        <FormContainer>
          <MuiIconButtonElement name="my-icon">Icon</MuiIconButtonElement>
        </FormContainer>
      );
    };

    const screen = await render(<WithName />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveAttribute('name', 'my-icon');
  });

  test('submits the parent form when type is submit', async () => {
    const onSubmit = vi.fn();

    const screen = await render(
      <FormContainer onSubmit={onSubmit}>
        <MuiIconButtonElement type="submit">Submit</MuiIconButtonElement>
      </FormContainer>,
    );

    await screen.getByRole('button').click();
    expect(onSubmit).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiIconButtonElement disabled>Disabled</MuiIconButtonElement>
      </FormContainer>,
    );

    await expect.element(screen.getByRole('button')).toBeDisabled();
  });
});
