import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { PatternFormatElement } from './element';

describe('PatternFormatElement', () => {
  it('renders initial defaultValue formatted using format prop', () => {
    cy.mount(
      <FormContainer defaultValues={{ phone: '4085551212' }}>
        <PatternFormatElement format="(###) ###-####" name="phone" />
      </FormContainer>,
    );

    cy.get('input').should('exist').and('have.value', '(408) 555-1212');
  });

  it('applies pattern formatting when typing', () => {
    cy.mount(
      <FormContainer>
        <PatternFormatElement format="(###) ###-####" name="phone" />
      </FormContainer>,
    );

    cy.get('input').should('exist').clear();
    cy.get('input').type('2125550100{enter}');
    cy.get('input').should('have.value', '(212) 555-0100');
  });
});
