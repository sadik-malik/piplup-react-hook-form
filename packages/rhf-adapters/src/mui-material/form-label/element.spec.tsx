import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiFormLabelElement } from './element';

describe('MuiFormLabelElement', () => {
  test('renders children and forwards htmlFor', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFormLabelElement data-testid="label" htmlFor="input-id" name="fullName">
          Full Name
        </MuiFormLabelElement>
      </FormContainer>,
    );
    const label = screen.getByTestId('label');
    await expect.element(label).toHaveTextContent('Full Name');
    await expect.element(label).toHaveAttribute('for', 'input-id');
  });

  test('forwards className to the label', async () => {
    const screen = await render(
      <FormContainer>
        <MuiFormLabelElement data-testid="label" className="my-label" name="my-label">
          Label
        </MuiFormLabelElement>
      </FormContainer>,
    );
    const label = screen.getByTestId('label');
    await expect.element(label).toHaveClass('my-label');
  });

  test('works inside a form and links to input via htmlFor', async () => {
    const screen = await render(
      <FormContainer>
        <div>
          <MuiFormLabelElement data-testid="label" htmlFor="linked" name="linked">
            Linked
          </MuiFormLabelElement>
          <input data-testid="linked-input" id="linked" />
        </div>
      </FormContainer>,
    );

    await screen.getByTestId('label').click();
    await expect.element(screen.getByTestId('linked-input')).toHaveFocus();
  });
});
