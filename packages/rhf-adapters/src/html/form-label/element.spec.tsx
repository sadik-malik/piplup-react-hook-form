import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { HtmlFormLabelElement } from './element';

describe('HtmlFormLabelElement', () => {
  test('renders children and forwards htmlFor', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlFormLabelElement name="name" htmlFor="input-id">
          Full Name
        </HtmlFormLabelElement>
      </FormContainer>,
    );

    const label = screen.getByText('Full Name');
    await expect(label).toBeInTheDocument();
    await expect(label).toHaveAttribute('for', 'input-id');
  });

  test('forwards className to the label', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlFormLabelElement name="name" className="my-label">
          Label
        </HtmlFormLabelElement>
      </FormContainer>,
    );
    await expect(screen.getByText('Label')).toHaveClass('my-label');
  });

  test('sets aria-disabled when disabled prop is true', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlFormLabelElement name="name" disabled>
          Disabled Label
        </HtmlFormLabelElement>
      </FormContainer>,
    );
    await expect(screen.getByText('Disabled Label')).toHaveAttribute('aria-disabled', 'true');
  });

  test('works inside a form and links to input via htmlFor', async () => {
    const screen = await render(
      <FormContainer>
        <div>
          <input data-testid="linked-input" id="linked" />
          <HtmlFormLabelElement name="name" htmlFor="linked">
            Linked
          </HtmlFormLabelElement>
        </div>
      </FormContainer>,
    );

    const label = screen.getByText('Linked');
    const input = screen.getByTestId('linked-input');
    await label.click();
    expect(input).toHaveFocus();
  });
});
