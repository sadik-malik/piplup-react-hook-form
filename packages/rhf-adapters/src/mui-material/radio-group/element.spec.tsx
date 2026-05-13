import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRadioGroupElement } from './element';

describe('MuiRadioGroupElement', () => {
  test('mounts and allows selecting an option', async () => {
    const screen = await render(
      <FormContainer>
        <MuiRadioGroupElement name="choice">
          <FormControlLabel control={<Radio name="choice" value="a" />} label="A" />
          <FormControlLabel control={<Radio name="choice" value="b" />} label="B" />
        </MuiRadioGroupElement>
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
        <MuiRadioGroupElement name="choice">
          <FormControlLabel control={<Radio name="choice" value="a" />} label="A" />
          <FormControlLabel control={<Radio name="choice" value="b" />} label="B" />
        </MuiRadioGroupElement>
      </FormContainer>,
    );

    const a = screen.getByRole('radio', {
      name: 'A',
    });
    await expect.element(a).toBeChecked();
  });

  test('forwards the name from adapter when provided via props', async () => {
    const screen = await render(
      <FormContainer>
        <MuiRadioGroupElement name="my-group">
          <FormControlLabel control={<Radio name="my-group" value="x" />} label="X" />
        </MuiRadioGroupElement>
      </FormContainer>,
    );
    const radio = screen.getByRole('radio');
    await expect.element(radio).toHaveAttribute('name', 'my-group');
  });

  test('fires onChange when option changes', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiRadioGroupElement name="choice" onChange={(e) => onChange(e)}>
          <FormControlLabel control={<Radio name="choice" value="a" />} label="A" />
        </MuiRadioGroupElement>
      </FormContainer>,
    );

    const radio = screen.getByRole('radio');
    await radio.click();
    expect(onChange).toHaveBeenCalled();
  });
});
