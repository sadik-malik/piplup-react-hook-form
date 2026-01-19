import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFormReset } from './use-form-reset';

function InputRegister({ name }: { name: string }) {
  const { register } = useFormContext();
  return <input data-cy={name} {...register(name)} />;
}

function ResetButtons() {
  const reset = useFormReset({});
  return (
    <div>
      <button data-cy="reset" onClick={() => reset()} type="button">
        Reset
      </button>
      <button
        data-cy="reset-new"
        onClick={() => reset({ name: 'new-value' })}
        type="button"
      >
        Reset To New
      </button>
      <button
        data-cy="reset-fn"
        onClick={() => reset((prev) => ({ ...(prev || {}), name: 'from-fn' }))}
        type="button"
      >
        Reset Fn
      </button>
    </div>
  );
}

describe('useFormReset', () => {
  it('resets form values to default values', () => {
    cy.mount(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    cy.get('[data-cy=name]').should('have.value', 'init');
    cy.get('[data-cy=name]').clear();
    cy.get('[data-cy=name]').type('changed');
    cy.get('[data-cy=name]').should('have.value', 'changed');

    cy.get('[data-cy=reset]').click();
    cy.then(() => {
      cy.get('[data-cy=name]').should('have.value', 'init');
    });
  });

  it('resets to provided values when passed an object', () => {
    cy.mount(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    cy.get('[data-cy=name]').clear();
    cy.get('[data-cy=name]').type('changed');
    cy.get('[data-cy=reset-new]').click();
    cy.get('[data-cy=name]').should('have.value', 'new-value');
  });

  it('resets using a function argument', () => {
    cy.mount(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    cy.get('[data-cy=name]').clear();
    cy.get('[data-cy=name]').type('something');
    cy.get('[data-cy=reset-fn]').click();
    cy.get('[data-cy=name]').should('have.value', 'from-fn');
  });
});
