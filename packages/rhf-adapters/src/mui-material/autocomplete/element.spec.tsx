import * as React from 'react';
import { TextField } from '@mui/material';
import { FormContainer } from '@piplup/rhf-core';
import { MuiAutocompleteElement } from './element';

describe('MuiAutocompleteElement', () => {
  it('mounts and allows selecting an option', () => {
    cy.mount(
      <FormContainer>
        <MuiAutocompleteElement
          name="fruit"
          options={['Apple', 'Banana']}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormContainer>,
    );

    cy.get('input').should('exist').click();
    cy.contains('li', 'Banana').click();
    cy.get('input').invoke('val').should('contain', 'Banana');
  });

  it('renders initial defaultValue', () => {
    cy.mount(
      <FormContainer defaultValues={{ fruit: 'Apple' }}>
        <MuiAutocompleteElement
          name="fruit"
          options={['Apple', 'Banana']}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormContainer>,
    );

    cy.get('input').invoke('val').should('contain', 'Apple');
  });

  it('supports multiple values and shows default chips', () => {
    cy.mount(
      <FormContainer defaultValues={{ fruit: ['Apple'] }}>
        <MuiAutocompleteElement
          name="fruit"
          options={['Apple', 'Banana', 'Cherry']}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />
      </FormContainer>,
    );

    cy.get('.MuiAutocomplete-root').first().realClick();
    cy.contains('.MuiAutocomplete-option', 'Banana').first().realClick();

    cy.contains('.MuiAutocomplete-tag', 'Apple').should('exist');
    cy.contains('.MuiAutocomplete-tag', 'Banana').should('exist');
  });

  it('shows error message when field has a validation error', () => {
    cy.mount(
      <FormContainer defaultValues={{}}>
        <MuiAutocompleteElement
          name="fruit"
          options={['Apple', 'Banana']}
          renderInput={(params) => <TextField {...params} label="Fruit"/>}
          rules={{ required: 'Select a fruit' }}
        />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    // trigger validation by submitting the form without selecting a value
    cy.get('button[type="submit"]').click();

    // the error message should be visible
    cy.contains('Select a fruit').should('be.visible');
  });
});
