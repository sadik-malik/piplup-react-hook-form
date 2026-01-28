import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSelectElement } from './element';
import { MuiFormHelperTextElement } from '../form-helper-text/element';

describe('MuiSelectElement', () => {
  it('mounts and allows selecting an option', () => {
    cy.mount(
      <FormContainer>
        <MuiSelectElement name="fruit" value="">
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    cy.get('.MuiInputBase-root').first().realClick();
    cy.get('.MuiMenu-root')
      .first()
      .within(() => {
        cy.contains('li', 'Banana').first().click();
      });
    cy.get('input').first().invoke('val').should('equal', 'banana');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ fruit: 'apple' }}>
        <MuiSelectElement name="fruit" value="">
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    cy.get('input').first().invoke('val').should('equal', 'apple');
  });

  it('forwards the name from adapter when provided via props', () => {
    cy.mount(
      <FormContainer>
        <MuiSelectElement name="my-select" value="">
          <MenuItem value="x">X</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    cy.get('input').should('exist').should('have.attr', 'name', 'my-select');
  });

  it('fires onChange when selecting', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiSelectElement name="fruit" onChange={(e) => onChange(e)}>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
      </FormContainer>,
    );

    cy.get('.MuiInputBase-root').first().realClick();
    cy.get('.MuiMenu-root')
      .first()
      .within(() => {
        cy.contains('li', 'Banana').first().click();
      });

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('shows error message when field has a validation error', () => {
    cy.mount(
      <FormContainer defaultValues={{}}>
        <MuiSelectElement
          label="Fruit"
          messages={{ required: 'Select a fruit' }}
          name="fruit"
          required
        >
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
        </MuiSelectElement>
        <MuiFormHelperTextElement name="fruit" renderOnError />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    // trigger validation by submitting the form without selecting a value
    cy.get('button[type="submit"]').click();

    // the error message should be visible
    cy.contains('Select a fruit').should('be.visible');
  });
});
