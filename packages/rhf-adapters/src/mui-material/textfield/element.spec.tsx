import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiTextFieldElement } from './element';

describe('MuiTextFieldElement', () => {
  it('mounts and allows typing', () => {
    cy.mount(
      <FormContainer>
        <MuiTextFieldElement name="first" placeholder="First" />
      </FormContainer>,
    );

    cy.get('input').should('exist').type('hello');
    cy.get('input').should('have.value', 'hello');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ first: 'prefilled' }}>
        <MuiTextFieldElement name="first" placeholder="First" />
      </FormContainer>,
    );

    cy.get('input').should('have.value', 'prefilled');
  });

  it('forwards the name from adapter when provided via props', () => {
    const WithName = () => (
      <FormContainer>
        <MuiTextFieldElement name="my-input" placeholder="My" />
      </FormContainer>
    );

    cy.mount(<WithName />);
    cy.get('input').should('have.attr', 'name', 'my-input');
  });

  it('fires onChange when typing', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiTextFieldElement name="first" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    cy.get('input').type('x');

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('shows helperText when provided', () => {
    cy.mount(
      <FormContainer>
        <MuiTextFieldElement helperText="Helpful" name="h" />
      </FormContainer>,
    );

    cy.get('.MuiFormHelperText-root').should('contain.text', 'Helpful');
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <MuiTextFieldElement name="disabled" placeholder="Disabled" disabled />
      </FormContainer>,
    );

    cy.get('input').should('be.disabled');
  });
});
