import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiOtpInputElement } from './element';
import { userEvent } from 'vitest/browser';

describe('MuiOtpInputElement', () => {
  test('renders initial defaultValue across inputs', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ otp: '1234' }} onSubmit={() => {}}>
        <MuiOtpInputElement name="otp" />
      </FormContainer>,
    );

    const inputs = screen.container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(4);
    const value = Array.from(inputs)
      .map((el) => (el as HTMLInputElement).value)
      .join('');
    expect(value).toBe('1234');
  });

  test('types into the first input and populates subsequent fields', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiOtpInputElement name="otp" />
      </FormContainer>,
    );

    const inputs = screen.container.querySelectorAll('input');
    const first = inputs[0] as HTMLInputElement;
    await userEvent.clear(first);
    await userEvent.type(first, '5678');

    const value = Array.from(inputs)
      .map((el) => (el as HTMLInputElement).value)
      .join('');
    expect(value).toBe('5678');
  });
});
