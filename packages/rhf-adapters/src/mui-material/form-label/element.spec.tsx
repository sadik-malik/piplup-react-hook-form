import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiFormLabelElement } from './element';

describe('MuiFormLabelElement', () => {
  it('renders children and forwards htmlFor', () => {
    cy.mount(
      <FormContainer>
        <MuiFormLabelElement htmlFor="input-id" name="fullName">
          Full Name
        </MuiFormLabelElement>
      </FormContainer>,
    );

    cy.get('label').should('contain.text', 'Full Name');
    cy.get('label').should('have.attr', 'for', 'input-id');
  });

  it('forwards className to the label', () => {
    cy.mount(
      <FormContainer>
        <MuiFormLabelElement className="my-label" name="my-label">
          Label
        </MuiFormLabelElement>
      </FormContainer>,
    );
    cy.get('label').should('have.class', 'my-label');
  });

  it('works inside a form and links to input via htmlFor', () => {
    cy.mount(
      <FormContainer>
        <div>
          <input data-cy="linked-input" id="linked" />
          <MuiFormLabelElement htmlFor="linked" name="linked">
            Linked
          </MuiFormLabelElement>
        </div>
      </FormContainer>,
    );

    cy.get('label').click();
    cy.get('[data-cy=linked-input]').should('have.focus');
  });
});
