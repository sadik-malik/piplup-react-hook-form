import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiChipsInputElement } from './element';

describe('MuiChipsInputElement', () => {
  it('mounts and accepts new chips via typing + Enter', () => {
    cy.mount(
      <FormContainer>
        <MuiChipsInputElement name="tags" />
      </FormContainer>,
    );

    cy.get('input').should('exist').type('foo{enter}');
    cy.contains('foo').should('exist');
  });

  it('renders initial defaultValue chips', () => {
    cy.mount(
      <FormContainer defaultValues={{ tags: ['bar'] }}>
        <MuiChipsInputElement name="tags" />
      </FormContainer>,
    );

    cy.contains('bar').should('exist');
  });
});
