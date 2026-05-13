import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiFabElement } from './element';
import { HtmlInputElement } from '../../html';

describe('MuiFabElement', () => {
  test('calls provided onClick and does not reset when type is button', async () => {
    const onClick = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiFabElement onClick={(e) => onClick(e)} type="button">
          Click
        </MuiFabElement>
      </FormContainer>,
    );

    await screen.getByRole('button').click();
    await expect(onClick).toHaveBeenCalled();
  });

  test('resets the form when type is reset', async () => {
    const SubmitForm = () => {
      const { control, handleSubmit } = useForm<{ foo: string }>({
        defaultValues: { foo: 'bar' },
      });
      return (
        <form
          onSubmit={handleSubmit(function () {
            // Do nothing
          })}
          noValidate
        >
          <HtmlInputElement data-testid="foo" placeholder="foo" control={control} name="foo" />
          <MuiFabElement control={control} type="reset">
            Reset
          </MuiFabElement>
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
          <MuiFabElement name="my-fab">Fab</MuiFabElement>
        </FormContainer>
      );
    };

    const screen = await render(<WithName />);
    const button = screen.getByRole('button');
    await expect.element(button).toHaveAttribute('name', 'my-fab');
  });

  test('submits the parent form when type is submit', async () => {
    const onSubmit = vi.fn();

    const screen = await render(
      <FormContainer onSubmit={onSubmit}>
        <MuiFabElement type="submit">Submit</MuiFabElement>
      </FormContainer>,
    );

    await screen.getByRole('button').click();
    await expect(onSubmit).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFabElement disabled>Disabled</MuiFabElement>
      </FormContainer>,
    );

    const button = screen.getByRole('button');
    await expect.element(button).toBeDisabled();
  });
});
