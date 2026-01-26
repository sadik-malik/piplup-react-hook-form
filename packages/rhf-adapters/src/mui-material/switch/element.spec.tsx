import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSwitchElement } from './element';

describe('MuiSwitchElement', () => {
  it('mounts and toggles switch', () => {
    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={<MuiSwitchElement name="agree" />}
          label="Agree"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').should('exist').and('not.be.checked');
    cy.get('input[type=checkbox]').click();
    cy.get('input[type=checkbox]').should('be.checked');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ agree: true }}>
        <FormControlLabel
          control={<MuiSwitchElement name="agree" />}
          label="Agree"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').should('be.checked');
  });

  it('forwards the name from adapter when provided via props', () => {
    const WithName = () => (
      <FormContainer>
        <FormControlLabel
          control={<MuiSwitchElement name="my-switch" />}
          label="Switch"
        />
      </FormContainer>
    );

    cy.mount(<WithName />);
    cy.get('input[type=checkbox]').should('have.attr', 'name', 'my-switch');
  });

  it('fires onChange when clicked', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={
            <MuiSwitchElement name="agree" onChange={(e) => onChange(e)} />
          }
          label="Agree"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').click();

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={<MuiSwitchElement name="disabled" disabled />}
          label="Disabled"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').should('be.disabled');
  });
});
