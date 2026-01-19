/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFormStateAdapter } from './use-form-state-adapter';

function Consumer(props: { helperText?: React.ReactNode; name?: string }) {
  const adapter = useFormStateAdapter({
    helperText: props.helperText,
    name: props.name,
  });
  return (
    <div data-cy="out" data-error={adapter.error ? '1' : '0'}>
      {String(adapter.helperText || '')}
    </div>
  );
}

function Input({ name }: { name: string }) {
  const { register } = useFormContext();
  return <input data-cy={name} {...register(name, { required: true })} />;
}

describe('useFormStateAdapter', () => {
  it('renders helperText when provided and no errors', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <Consumer helperText="help" />
      </FormContainer>,
    );

    cy.get('[data-cy=out]').should('contain.text', 'help');
    cy.get('[data-cy=out]').should('have.attr', 'data-error', '0');
  });

  it('reflects form errors and composes helper text', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <Input name="x" />
        <Consumer helperText="fallback" name="x" />
        <button type="submit">S</button>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();
    cy.then(() => {
      cy.get('[data-cy=out]').should('have.attr', 'data-error', '1');
    });
  });
});
