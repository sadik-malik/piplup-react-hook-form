/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { HtmlButtonElement } from './element';

describe('HtmlButtonElement', () => {
  it('calls provided onClick and does not reset when type is button', () => {
    const onClick = cy.stub();

    cy.mount(
      <FormContainer>
        <HtmlButtonElement onClick={(e) => onClick(e)} type="button">
          Click
        </HtmlButtonElement>
      </FormContainer>,
    );

    cy.get('button').click();

    cy.then(() => {
      expect(onClick.called).to.equal(true);
    });
  });

  it('resets the form when type is reset', () => {
    const SubmitForm = () => {
      const { control, handleSubmit, register } = useForm<{ foo: string }>({
        defaultValues: { foo: 'bar' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <input data-cy="foo" placeholder="foo" {...register('foo')} />
          <HtmlButtonElement control={control} type="reset">
            Reset
          </HtmlButtonElement>
        </form>
      );
    };

    cy.mount(<SubmitForm />);

    cy.get('[data-cy=foo]').clear();
    cy.get('[data-cy=foo]').type('changed');
    cy.get('button[type=reset]').click();
    cy.then(() => {
      cy.get('[data-cy=foo]').should('have.value', 'bar');
    });
  });

  it('forwards the name from adapter when provided via props', () => {
    const WithName = () => {
      return (
        <FormContainer>
          <HtmlButtonElement name="my-button">Btn</HtmlButtonElement>
        </FormContainer>
      );
    };

    cy.mount(<WithName />);
    cy.get('button').should('have.attr', 'name', 'my-button');
  });

  it('submits the parent form when type is submit', () => {
    const onSubmit = cy.stub();

    cy.mount(
      <FormContainer onSubmit={onSubmit}>
        <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit.called).to.equal(true);
    });
  });
});
