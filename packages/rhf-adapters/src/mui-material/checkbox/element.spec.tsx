import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormContainer } from '@piplup/rhf-core';
import { MuiCheckboxElement } from './element';

describe('MuiCheckboxElement', () => {
  test('mounts and toggles checkbox', async () => {
    const screen = await render(
      <FormContainer>
        <FormControlLabel control={<MuiCheckboxElement name="agree" value />} label="Agree" />
      </FormContainer>,
    );

    const checkbox = screen.getByRole('checkbox');

    await expect.element(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    await expect.element(checkbox).toBeChecked();
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ agree: [true] }}>
        <FormControlLabel control={<MuiCheckboxElement name="agree" value />} label="Agree" />
      </FormContainer>,
    );

    const checkbox = screen.getByRole('checkbox');

    await expect.element(checkbox).toBeChecked();
  });

  test('forwards the name when provided via props', async () => {
    const screen = await render(
      <FormContainer>
        <FormControlLabel control={<MuiCheckboxElement name="my-checkbox" value />} label="Chk" />
      </FormContainer>,
    );
    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toHaveAttribute('name', 'my-checkbox');
  });

  test('fires onChange when clicked', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <FormControlLabel
          control={<MuiCheckboxElement name="agree" onChange={(e) => onChange(e)} value />}
          label="Agree"
        />
      </FormContainer>,
    );

    const checkbox = screen.getByRole('checkbox');
    await checkbox.click();

    await expect(onChange).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <FormControlLabel
          control={<MuiCheckboxElement name="agree" disabled value />}
          label="Agree"
        />
      </FormContainer>,
    );

    const checkbox = screen.getByRole('checkbox');
    await expect.element(checkbox).toBeDisabled();
  });
});
