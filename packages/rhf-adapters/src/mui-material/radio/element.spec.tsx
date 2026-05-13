import * as React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRadioElement } from './element';

describe('MuiRadioElement', () => {
  test('mounts and allows selecting an option', async () => {
    const screen = await render(
      <FormContainer>
        <div>
          <FormControlLabel control={<MuiRadioElement name="choice" value="a" />} label="A" />
          <FormControlLabel control={<MuiRadioElement name="choice" value="b" />} label="B" />
        </div>
      </FormContainer>,
    );

    const b = screen.getByRole('radio', {
      name: 'B',
    });
    await b.click();
    await expect.element(b).toBeChecked();
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ choice: 'a' }}>
        <div>
          <FormControlLabel control={<MuiRadioElement name="choice" value="a" />} label="A" />
          <FormControlLabel control={<MuiRadioElement name="choice" value="b" />} label="B" />
        </div>
      </FormContainer>,
    );

    const a = screen.getByRole('radio', {
      name: 'A',
    });
    await expect.element(a).toBeChecked();
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => (
      <FormContainer>
        <FormControlLabel control={<MuiRadioElement name="my-radio" value="x" />} label="X" />
      </FormContainer>
    );

    const screen = await render(<WithName />);
    const radio = screen.getByRole('radio');
    await expect.element(radio).toHaveAttribute('name', 'my-radio');
  });

  test('fires onChange when clicked', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <FormControlLabel
          control={<MuiRadioElement name="choice" onChange={(e) => onChange(e)} value="a" />}
          label="X"
        />
      </FormContainer>,
    );

    const radio = screen.getByRole('radio');
    await radio.click();

    await expect(onChange).toHaveBeenCalled();
  });

  test('respects disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <FormControlLabel
          control={<MuiRadioElement name="disabled" value="d" disabled />}
          label="Disabled"
        />
      </FormContainer>,
    );

    const radio = screen.getByRole('radio');
    await expect.element(radio).toBeDisabled();
  });
});
