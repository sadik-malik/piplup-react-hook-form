import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiInputBaseElement } from './element';

describe('MuiInputBaseElement', () => {
  it('mounts and allows typing', () => {
    cy.mount(
      <FormContainer>
        <MuiInputBaseElement name="first" placeholder="First" />
      </FormContainer>,
    );

    cy.get('input').should('exist').type('hello');
    cy.get('input').should('have.value', 'hello');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ first: 'prefilled' }}>
        <MuiInputBaseElement name="first" placeholder="First" />
      </FormContainer>,
    );

    cy.get('input').should('have.value', 'prefilled');
  });

  it('forwards the name from adapter when provided via props', () => {
    cy.mount(
      <FormContainer>
        <MuiInputBaseElement name="my-input" placeholder="My" />
      </FormContainer>,
    );
    cy.get('input').should('have.attr', 'name', 'my-input');
  });

  it('fires onChange when typing', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiInputBaseElement name="first" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    cy.get('input').type('x');

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <MuiInputBaseElement name="first" placeholder="Disabled" disabled />
      </FormContainer>,
    );

    cy.get('input').should('be.disabled');
  });
});
