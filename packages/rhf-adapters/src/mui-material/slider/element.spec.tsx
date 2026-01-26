import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSliderElement } from './element';

describe('MuiSliderElement', () => {
  it('mounts and allows keyboard changes', () => {
    cy.mount(
      <FormContainer defaultValues={{ volume: 20 }}>
        <MuiSliderElement name="volume" />
      </FormContainer>,
    );

    cy.get('input').first().focus();
    cy.get('input').first().realPress(['ArrowRight', 'ArrowRight']);
    cy.get('input')
      .first()
      .invoke('attr', 'aria-valuenow')
      .then(Number)
      .should('be.greaterThan', 20);
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ volume: 30 }}>
        <MuiSliderElement name="volume" />
      </FormContainer>,
    );

    cy.get('input')
      .first()
      .invoke('attr', 'aria-valuenow')
      .should('equal', '30');
  });

  it('fires onChange when changed via keyboard', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiSliderElement name="volume" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    cy.get('input').first().focus();
    cy.get('input').first().realPress('ArrowRight');

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <MuiSliderElement name="volume" disabled />
      </FormContainer>,
    );

    cy.get('input').first().should('have.attr', 'disabled');
  });
});
