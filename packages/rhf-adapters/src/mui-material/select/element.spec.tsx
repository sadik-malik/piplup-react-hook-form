import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { FormContainer } from '@piplup/rhf-core';
import { MuiSelectElement } from './element';

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
        <MuiSelectElement name="fruit" onChange={(e) => onChange(e)} value="">
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
});
