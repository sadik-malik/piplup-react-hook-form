/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiColorInputElement } from './element';

describe('MuiColorInputElement', () => {
  test('renders initial defaultValue color', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiColorInputElement defaultValue="rgb(0, 255, 0)" name="color" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await expect(input).toHaveValue('rgb(0, 255, 0)');
  });

  test('allows typing a new color value', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiColorInputElement name="color" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'rgb(255, 0, 0)');
    await userEvent.keyboard('{Enter}');

    await expect(input).toHaveValue('rgb(255, 0, 0)');
  });
});
