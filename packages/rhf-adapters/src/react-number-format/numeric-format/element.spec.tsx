import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { NumericFormatElement } from './element';

describe('NumericFormatElement', () => {
  test('renders initial defaultValue formatted', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ value: 12345 }}>
        <NumericFormatElement name="value" thousandSeparator />
      </FormContainer>,
    );

    await expect(screen.getByRole('textbox')).toHaveValue('12,345');
  });

  test('formats typed numbers', async () => {
    const screen = await render(
      <FormContainer>
        <NumericFormatElement name="value" thousandSeparator />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '98765');
    await userEvent.keyboard('{Enter}');

    expect(input).toHaveValue('98,765');
  });
});
