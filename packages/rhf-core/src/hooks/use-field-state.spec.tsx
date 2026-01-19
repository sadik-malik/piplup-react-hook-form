import * as React from 'react';
import {
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { FormContainer } from '../form';
import { useFieldState } from './use-field-state';

function InputRegister({
  name,
  rules,
}: {
  name: string;
  rules?: RegisterOptions<FieldValues, string>;
}) {
  const { register } = useFormContext();
  return <input data-cy="input" {...register(name, rules)} />;
}

function FieldStateConsumer({ name }: { name: string }) {
  const state = useFieldState({ name });
  return (
    <div>
      <span data-cy="error">{state.error ? '1' : '0'}</span>
      <span data-cy="invalid">{state.invalid ? '1' : '0'}</span>
      <span data-cy="dirty">{state.isDirty ? '1' : '0'}</span>
      <span data-cy="touched">{state.isTouched ? '1' : '0'}</span>
    </div>
  );
}

describe('useFieldState', () => {
  it('initially has no error, not dirty, not touched', () => {
    cy.mount(
      <FormContainer>
        <InputRegister name="name" />
        <FieldStateConsumer name="name" />
      </FormContainer>,
    );

    cy.get('[data-cy=error]').should('contain.text', '0');
    cy.get('[data-cy=invalid]').should('contain.text', '0');
    cy.get('[data-cy=dirty]').should('contain.text', '0');
    cy.get('[data-cy=touched]').should('contain.text', '0');
  });

  it('marks dirty when value changes and touched on blur', () => {
    cy.mount(
      <FormContainer>
        <InputRegister name="name" />
        <FieldStateConsumer name="name" />
      </FormContainer>,
    );

    cy.get('[data-cy=dirty]').should('contain.text', '0');
    cy.get('[data-cy=input]').type('X');
    cy.get('[data-cy=dirty]').should('contain.text', '1');

    cy.get('[data-cy=touched]').should('contain.text', '0');
    cy.get('[data-cy=input]').blur();
    cy.get('[data-cy=touched]').should('contain.text', '1');
  });

  it('reports validation error when submit without required value', () => {
    const onSubmit = cy.stub();
    const onError = cy.stub();

    cy.mount(
      <FormContainer onError={(e) => onError(e)} onSubmit={() => onSubmit()}>
        <InputRegister name="name" rules={{ required: true }} />
        <FieldStateConsumer name="name" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit.called).to.equal(false);
      expect(onError.called).to.equal(true);
      const err = onError.getCall(0).args[0];
      expect(err).to.have.property('name');
    });

    cy.get('[data-cy=error]').should('contain.text', '1');
    cy.get('[data-cy=invalid]').should('contain.text', '1');
  });
});
