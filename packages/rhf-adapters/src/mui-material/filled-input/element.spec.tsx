import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiFilledInputElement } from './element';

describe('MuiFilledInputElement', () => {
  test('mounts and allows typing', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFilledInputElement name="first" placeholder="First" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect.element(input).toHaveValue('hello');
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ first: 'prefilled' }}>
        <MuiFilledInputElement name="first" placeholder="First" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveValue('prefilled');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => (
      <FormContainer>
        <MuiFilledInputElement name="my-input" placeholder="My" />
      </FormContainer>
    );

    const screen = await render(<WithName />);
    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveAttribute('name', 'my-input');
  });

  test('fires onChange when typing', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiFilledInputElement name="first" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'x');
    await expect(onChange).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFilledInputElement name="first" placeholder="Disabled" disabled />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });
});
