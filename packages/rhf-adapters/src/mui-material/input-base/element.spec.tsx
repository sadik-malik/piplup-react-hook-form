import * as React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiInputBaseElement } from './element';

describe('MuiInputBaseElement', () => {
  test('mounts and allows typing', async () => {
    const screen = await render(
      <FormContainer>
        <MuiInputBaseElement name="first" placeholder="First" />
      </FormContainer>,
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect.element(input).toHaveValue('hello');
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ first: 'prefilled' }}>
        <MuiInputBaseElement name="first" placeholder="First" />
      </FormContainer>,
    );
    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveValue('prefilled');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const screen = await render(
      <FormContainer>
        <MuiInputBaseElement name="my-input" placeholder="My" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveAttribute('name', 'my-input');
  });

  test('fires onChange when typing', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiInputBaseElement name="first" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'x');

    await expect(onChange).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiInputBaseElement name="first" placeholder="Disabled" disabled />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });
});
