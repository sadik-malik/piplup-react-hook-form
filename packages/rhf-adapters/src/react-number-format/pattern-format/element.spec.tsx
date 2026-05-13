import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { PatternFormatElement } from './element';

describe('PatternFormatElement', () => {
  test('renders initial defaultValue formatted using format prop', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ phone: '4085551212' }}>
        <PatternFormatElement format="(###) ###-####" name="phone" />
      </FormContainer>,
    );

    await expect(screen.getByRole('textbox')).toHaveValue('(408) 555-1212');
  });

  test('applies pattern formatting when typing', async () => {
    const screen = await render(
      <FormContainer>
        <PatternFormatElement format="(###) ###-####" name="phone" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '2125550100');
    await userEvent.keyboard('{Enter}');

    expect(input).toHaveValue('(212) 555-0100');
  });
});
