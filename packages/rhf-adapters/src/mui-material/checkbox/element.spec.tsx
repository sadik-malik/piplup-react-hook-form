import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormContainer } from '@piplup/rhf-core';
import { MuiCheckboxElement } from './element';

describe('MuiCheckboxElement', () => {
  it('mounts and toggles checkbox', () => {
    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={<MuiCheckboxElement name="agree" value />}
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
      <FormContainer defaultValues={{ agree: [true] }}>
        <FormControlLabel
          control={<MuiCheckboxElement name="agree" value />}
          label="Agree"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').should('be.checked');
  });

  it('forwards the name when provided via props', () => {
    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={<MuiCheckboxElement name="my-checkbox" value />}
          label="Chk"
        />
      </FormContainer>,
    );
    cy.get('input[type=checkbox]').should('have.attr', 'name', 'my-checkbox');
  });

  it('fires onChange when clicked', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={
            <MuiCheckboxElement
              name="agree"
              onChange={(e) => onChange(e)}
              value
            />
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
          control={<MuiCheckboxElement name="agree" disabled value />}
          label="Agree"
        />
      </FormContainer>,
    );

    cy.get('input[type=checkbox]').should('be.disabled');
  });
});
