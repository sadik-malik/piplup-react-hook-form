import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiChipsInputElement } from './element';

describe('MuiChipsInputElement', () => {
  test('mounts and accepts new chips via typing + Enter', async () => {
    const screen = await render(
      <FormContainer>
        <MuiChipsInputElement name="tags" />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await input.fill('foo');
    await userEvent.keyboard('{Enter}');

    await expect(screen.getByText('foo')).toBeInTheDocument();
  });

  test('renders initial defaultValue chips', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ tags: ['bar'] }}>
        <MuiChipsInputElement name="tags" />
      </FormContainer>,
    );

    await expect(screen.getByText('bar')).toBeInTheDocument();
  });
});
