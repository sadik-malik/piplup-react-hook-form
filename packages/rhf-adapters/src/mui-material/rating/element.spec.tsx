import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRatingElement } from './element';

describe('MuiRatingElement', () => {
  it('mounts and allows selecting a rating', () => {
    cy.mount(
      <FormContainer>
        <MuiRatingElement name="stars" />
      </FormContainer>,
    );

    // MUI Rating renders radio inputs; click the third star
    cy.get('label').eq(2).click();
    cy.get('input[type=radio]').eq(2).should('be.checked');
    cy.get('input[type=radio]').eq(3).should('not.be.checked');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ stars: 2 }}>
        <MuiRatingElement name="stars" />
      </FormContainer>,
    );

    cy.get('input[type=radio]').eq(1).should('be.checked');
    cy.get('input[type=radio]').eq(2).should('not.be.checked');
  });

  it('forwards the name from adapter when provided via props', () => {
    cy.mount(
      <FormContainer>
        <MuiRatingElement name="my-stars" />
      </FormContainer>,
    );

    cy.get('input[type=radio]').first().should('have.attr', 'name', 'my-stars');
  });

  it('fires onChange when selecting', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiRatingElement name="stars" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    cy.get('label').eq(3).click();

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });
});
