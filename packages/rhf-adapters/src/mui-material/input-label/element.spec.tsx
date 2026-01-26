import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiInputLabelElement } from './element';

describe('MuiInputLabelElement', () => {
  it('renders children and forwards htmlFor', () => {
    cy.mount(
      <FormContainer>
        <MuiInputLabelElement htmlFor="input-id" name="fullName">
          Full Name
        </MuiInputLabelElement>
      </FormContainer>,
    );

    cy.get('label').should('contain.text', 'Full Name');
    cy.get('label').should('have.attr', 'for', 'input-id');
  });

  it('forwards className to the label', () => {
    cy.mount(
      <FormContainer>
        <MuiInputLabelElement className="my-label" name="my-label">
          Label
        </MuiInputLabelElement>
      </FormContainer>,
    );
    cy.get('label').should('have.class', 'my-label');
  });

  it('works inside a form and links to input via htmlFor', () => {
    cy.mount(
      <FormContainer>
        <div>
          <input data-cy="linked-input" id="linked" />
          <MuiInputLabelElement htmlFor="linked" name="linked">
            Linked
          </MuiInputLabelElement>
        </div>
      </FormContainer>,
    );

    cy.get('label').click();
    cy.get('[data-cy=linked-input]').should('have.focus');
  });
});
