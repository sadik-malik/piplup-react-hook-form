import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormControlLabel } from '@mui/material';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSwitchElement } from './element';

describe('MuiSwitchElement', () => {
  test('mounts and toggles switch', async () => {
    const screen = await render(
      <FormContainer>
        <FormControlLabel control={<MuiSwitchElement name="agree" />} label="Agree" />
      </FormContainer>,
    );

    const swt = screen.getByRole('switch');
    await expect.element(swt).toBeInTheDocument();
    await expect.element(swt).not.toBeChecked();

    await swt.click();

    await expect.element(swt).toBeChecked();
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ agree: true }}>
        <FormControlLabel control={<MuiSwitchElement name="agree" />} label="Agree" />
      </FormContainer>,
    );

    const swt = screen.getByRole('switch');
    await expect.element(swt).toBeChecked();
  });

  test('forwards the name from adapter when provided via props', async () => {
    const WithName = () => (
      <FormContainer>
        <FormControlLabel control={<MuiSwitchElement name="my-switch" />} label="Switch" />
      </FormContainer>
    );

    const screen = await render(<WithName />);

    const swt = screen.getByRole('switch');
    await expect.element(swt).toHaveAttribute('name', 'my-switch');
  });

  test('fires onChange when clicked', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <FormControlLabel
          control={<MuiSwitchElement name="agree" onChange={(e) => onChange(e)} />}
          label="Agree"
        />
      </FormContainer>,
    );

    const swt = screen.getByRole('switch');
    await swt.click();
    await expect(onChange).toHaveBeenCalled();
  });

  // it('respects disabled prop', () => {
  //   cy.mount(
  //     <FormContainer>
  //       <FormControlLabel
  //         control={<MuiSwitchElement name="disabled" disabled />}
  //         label="Disabled"
  //       />
  //     </FormContainer>,
  //   );

  //   cy.get('input[type=checkbox]').should('be.disabled');
  // });
});
