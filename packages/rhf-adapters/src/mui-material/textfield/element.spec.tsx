import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { formHelperTextClasses } from '@mui/material';
import { MuiTextFieldElement } from './element';

describe('MuiTextFieldElement', () => {
  test('mounts and allows typing', async () => {
    const screen = await render(
      <FormContainer>
        <MuiTextFieldElement name="first" placeholder="First" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toBeInTheDocument();

    await userEvent.type(input, 'hello');
    await expect.element(input).toHaveValue('hello');
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ first: 'prefilled' }}>
        <MuiTextFieldElement name="first" placeholder="First" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveValue('prefilled');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => (
      <FormContainer>
        <MuiTextFieldElement name="my-input" placeholder="My" />
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
        <MuiTextFieldElement name="first" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'x');

    expect(onChange).toHaveBeenCalled();
  });

  test('shows helperText when provided', async () => {
    const screen = await render(
      <FormContainer>
        <MuiTextFieldElement helperText="Helpful" name="h" />
      </FormContainer>,
    );

    const helperText = screen.container.querySelector(`.${formHelperTextClasses.root}`);
    expect(helperText).toBeTruthy();
    await expect.element(helperText as HTMLElement).toBeInTheDocument();
    await expect.element(helperText as HTMLElement).toHaveTextContent('Helpful');
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <MuiTextFieldElement name="disabled" placeholder="Disabled" disabled />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect.element(input).toBeDisabled();
  });
});
