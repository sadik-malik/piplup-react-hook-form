import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { NumericFormatElement } from './element';

describe('NumericFormatElement', () => {
  it('renders initial defaultValue formatted', () => {
    cy.mount(
      <FormContainer defaultValues={{ value: 12345 }}>
        <NumericFormatElement name="value" thousandSeparator />
      </FormContainer>,
    );

    cy.get('input').should('exist').and('have.value', '12,345');
  });

  it('formats typed numbers', () => {
    cy.mount(
      <FormContainer>
        <NumericFormatElement name="value" thousandSeparator />
      </FormContainer>,
    );

    cy.get('input').should('exist').clear();
    cy.get('input').type('98765{enter}');
    cy.get('input').should('have.value', '98,765');
  });
});
