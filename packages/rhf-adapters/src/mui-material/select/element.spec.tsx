import * as React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MenuItem, inputBaseClasses } from '@mui/material';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSelectElement } from './element';
import { MuiFormHelperTextElement } from '../form-helper-text/element';

describe('MuiSelectElement', () => {
  test('mounts and allows selecting an option', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ fruit: '' }}>
        <MuiSelectElement name="fruit" value="">
          <MenuItem value="">Select Fruit</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    const inputBase = screen.container.querySelector(`.${inputBaseClasses.root}`);
    await expect(inputBase).toBeTruthy();
    await userEvent.click(inputBase as HTMLElement);

    const bananaOption = screen.getByRole('option', {
      name: 'Banana',
    });
    await userEvent.click(bananaOption);

    const input = screen.getByRole('combobox');
    await expect.element(input).toBeInTheDocument();
    await expect.element(input).toHaveTextContent('Banana');
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ fruit: 'apple' }}>
        <MuiSelectElement name="fruit" value="">
          <MenuItem value="">Select Fruit</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    const input = screen.getByRole('combobox');
    await expect.element(input).toHaveTextContent('Apple');
  });

  test('forwards the name from adapter when provided via props', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ 'my-select': '' }}>
        <MuiSelectElement name="my-select" value="">
          <MenuItem value="">Select value</MenuItem>
          <MenuItem value="x">X</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    const input = screen.container.querySelector('input[name="my-select"]');

    await expect(input).toBeTruthy();
    await expect(input).toHaveAttribute('name', 'my-select');
  });

  test('fires onChange when selecting', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer defaultValues={{ fruit: '' }}>
        <MuiSelectElement name="fruit" onChange={(e) => onChange(e)}>
          <MenuItem value="">Select Fruit</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    const combobox = screen.getByRole('combobox');
    await userEvent.click(combobox);

    const bananaOption = screen.getByRole('option', {
      name: 'Banana',
    });
    await userEvent.click(bananaOption);
    await expect(onChange).toHaveBeenCalled();
  });

  test('shows error message when field has a validation error', async () => {
    const screen = await render(
      <FormContainer defaultValues={{}}>
        <MuiSelectElement
          label="Fruit"
          messages={{ required: 'Select a fruit' }}
          name="fruit"
          required
        >
          <MenuItem value="">Select Fruit</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
        <MuiFormHelperTextElement name="fruit" renderOnError />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    const submitButton = screen.getByRole('button', {
      name: 'Submit',
    });

    await userEvent.click(submitButton);

    const error = screen.getByText('Select a fruit');

    await expect.element(error).toBeVisible();
  });
});
