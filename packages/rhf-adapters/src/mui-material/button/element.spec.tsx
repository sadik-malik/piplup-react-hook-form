/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiButtonElement } from './element';
import { HtmlInputElement } from '../../html';

describe('MuiButtonElement', () => {
  test('calls provided onClick and does not reset when type is button', async () => {
    const onClick = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiButtonElement onClick={(e) => onClick(e)} type="button">
          Click
        </MuiButtonElement>
      </FormContainer>,
    );

    await screen.getByRole('button').click();

    expect(onClick).toHaveBeenCalled();
  });

  test('resets the form when type is reset', async () => {
    const SubmitForm = () => {
      const { control, handleSubmit } = useForm<{ foo: string }>({
        defaultValues: { foo: 'bar' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <HtmlInputElement placeholder="foo" control={control} name="foo" />
          <MuiButtonElement control={control} type="reset">
            Reset
          </MuiButtonElement>
        </form>
      );
    };

    const screen = await render(<SubmitForm />);

    const input = screen.getByPlaceholder('foo');
    await userEvent.clear(input);
    await userEvent.type(input, 'changed');
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));

    expect(input).toHaveValue('bar');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => {
      return (
        <FormContainer>
          <MuiButtonElement name="my-button">Btn</MuiButtonElement>
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
        <MuiButtonElement type="submit">Submit</MuiButtonElement>
      </FormContainer>,
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiButtonElement disabled>Disabled</MuiButtonElement>
      </FormContainer>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
