/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiTelInputElement } from './element';

describe('MuiTelInputElement', () => {
  it('renders initial defaultValue phone number', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiTelInputElement defaultValue="+1 555 123 4567" name="phone" />
      </FormContainer>,
    );

    cy.get('input').should('exist').and('have.value', '+1 555 123 4567');
  });

  it('allows typing a phone number and submitting', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiTelInputElement name="phone" />
      </FormContainer>,
    );

    cy.get('input').should('exist').clear();
    cy.get('input').type('+1 408 555 1212{enter}');
    cy.get('input').should('have.value', '+1 408 555 1212');
  });
});
