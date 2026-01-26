/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiOtpInputElement } from './element';

describe('MuiOtpInputElement', () => {
  it('renders initial defaultValue across inputs', () => {
    cy.mount(
      <FormContainer defaultValues={{ otp: '1234' }} onSubmit={() => {}}>
        <MuiOtpInputElement name="otp" />
      </FormContainer>,
    );

    cy.get('input').should('have.length.at.least', 4);
    cy.get('input').then(($els) => {
      const value = Array.from($els)
        .map((el: HTMLInputElement) => el.value)
        .join('');
      expect(value).to.equal('1234');
    });
  });

  it('types into the first input and populates subsequent fields', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiOtpInputElement name="otp" />
      </FormContainer>,
    );

    cy.get('input').first().should('exist').clear();
    cy.get('input').first().type('5678');

    cy.get('input').then(($els) => {
      const value = Array.from($els)
        .map((el: HTMLInputElement) => el.value)
        .join('');
      expect(value).to.equal('5678');
    });
  });
});
