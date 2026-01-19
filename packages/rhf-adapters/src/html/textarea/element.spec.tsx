/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { FormContainer } from '@piplup/rhf-core'
import { HtmlTextareaElement } from './element'

describe('HtmlTextareaElement', () => {
  it('forwards the name attribute', () => {
    cy.mount(
      <FormContainer>
        <HtmlTextareaElement data-cy="ta" name="my-textarea" />
      </FormContainer>,
    )

    cy.get('textarea').should('have.attr', 'name', 'my-textarea')
  })

  it('binds to the form and submits value', () => {
    const onSubmit = cy.stub()

    cy.mount(
      <FormContainer onSubmit={(d) => onSubmit(d)}>
        <HtmlTextareaElement data-cy="bio" name="bio" />
        <button type="submit">Submit</button>
      </FormContainer>,
    )

    cy.get('[data-cy=bio]').type('Hello world')
    cy.get('button[type=submit]').click()

    cy.then(() => {
      expect(onSubmit).to.have.been.calledWith({ bio: 'Hello world' })
    })
  })

  it('respects defaultValue prop', () => {
    cy.mount(
      <FormContainer>
        <HtmlTextareaElement data-cy="note" defaultValue="init" name="note" />
      </FormContainer>,
    )

    cy.get('[data-cy=note]').should('have.value', 'init')
  })

  it('applies disabled prop', () => {
    cy.mount(
      <FormContainer>
        <HtmlTextareaElement data-cy="disabled" name="x" disabled />
      </FormContainer>,
    )

    cy.get('[data-cy=disabled]').should('be.disabled')
  })

  it('calls onError when required validation fails', () => {
    const onSubmit = cy.stub()
    const onError = cy.stub()

    cy.mount(
      <FormContainer onError={(e) => onError(e)} onSubmit={(d) => onSubmit(d)}>
        <HtmlTextareaElement data-cy="desc" name="desc" rules={{ required: true }} />
        <button type="submit">Submit</button>
      </FormContainer>,
    )

    cy.get('button[type=submit]').click()

    cy.then(() => {
      expect(onSubmit.called).to.equal(false);
      expect(onError.called).to.equal(true);
      const err = onError.getCall(0).args[0]
      expect(err).to.have.property('desc')
      expect(err.desc).to.have.property('type', 'required')
    })
  })

  it('validates minLength and reports minLength error', () => {
    const onError = cy.stub()

    cy.mount(
      <FormContainer onError={(e) => onError(e)} onSubmit={() => {}}>
        <HtmlTextareaElement data-cy="short" name="short" rules={{ minLength: 5 }} />
        <button type="submit">Submit</button>
      </FormContainer>,
    )

    cy.get('[data-cy=short]').type('123')
    cy.get('button[type=submit]').click()

    cy.then(() => {
      expect(onError.called).to.equal(true);
      const err = onError.getCall(0).args[0]
      expect(err.short).to.have.property('type', 'minLength')
    })
  })
})
