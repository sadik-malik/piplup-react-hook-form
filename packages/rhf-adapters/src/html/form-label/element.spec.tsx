import * as React from 'react'
import { FormContainer } from '@piplup/rhf-core'
import { HtmlFormLabelElement } from './element'

describe('HtmlFormLabelElement', () => {
  it('renders children and forwards htmlFor', () => {
    cy.mount(
      <FormContainer>
        <HtmlFormLabelElement htmlFor="input-id">Full Name</HtmlFormLabelElement>
      </FormContainer>,
    )

    cy.get('label').should('contain.text', 'Full Name')
    cy.get('label').should('have.attr', 'for', 'input-id')
  })

  it('forwards className to the label', () => {
    cy.mount(
      <FormContainer>
        <HtmlFormLabelElement className="my-label">Label</HtmlFormLabelElement>
      </FormContainer>,
    )
    cy.get('label').should('have.class', 'my-label')
  })

  it('sets aria-disabled when disabled prop is true', () => {
    cy.mount(
      <FormContainer>
        <HtmlFormLabelElement disabled>Disabled Label</HtmlFormLabelElement>
      </FormContainer>,
    )
    cy.get('label').should('have.attr', 'aria-disabled', 'true')
  })

  it('works inside a form and links to input via htmlFor', () => {
    cy.mount(
      <FormContainer>
        <div>
          <input data-cy="linked-input" id="linked" />
          <HtmlFormLabelElement htmlFor="linked">Linked</HtmlFormLabelElement>
        </div>
      </FormContainer>,
    )

    cy.get('label').click()
    cy.get('[data-cy=linked-input]').should('have.focus')
  })
})
