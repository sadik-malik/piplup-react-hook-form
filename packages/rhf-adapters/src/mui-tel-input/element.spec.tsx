import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiTelInputElement } from './element';
import { userEvent } from 'vitest/browser';

describe('MuiTelInputElement', () => {
  test('renders initial defaultValue phone number', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiTelInputElement defaultValue="+1 555 123 4567" name="phone" />
      </FormContainer>,
    );

    expect(screen.getByRole('textbox')).toHaveValue('+1 555 123 4567');
  });

  test('allows typing a phone number and submitting', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiTelInputElement name="phone" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '+1 408 555 1212');
    await userEvent.keyboard('{Enter}');

    expect(input).toHaveValue('+1 408 555 1212');
  });
});
