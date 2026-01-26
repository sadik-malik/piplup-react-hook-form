/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiColorInputElement } from './element';

describe('MuiColorInputElement', () => {
  it('renders initial defaultValue color', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiColorInputElement defaultValue="rgb(0, 255, 0)" name="color" />
      </FormContainer>,
    );

    cy.get('input').should('exist').and('have.value', 'rgb(0, 255, 0)');
  });

  it('allows typing a new color value', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiColorInputElement name="color" />
      </FormContainer>,
    );

    cy.get('input').should('exist').clear();
    cy.get('input').type('rgb(255, 0, 0){enter}');
    cy.get('input').should('have.value', 'rgb(255, 0, 0)');
  });
});
