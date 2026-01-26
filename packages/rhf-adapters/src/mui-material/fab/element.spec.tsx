import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiFabElement } from './element';

describe('MuiFabElement', () => {
  it('calls provided onClick and does not reset when type is button', () => {
    const onClick = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiFabElement onClick={(e) => onClick(e)} type="button">
          Click
        </MuiFabElement>
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
        <form
          onSubmit={handleSubmit(function () {
            // Do nothing
          })}
          noValidate
        >
          <input data-cy="foo" placeholder="foo" {...register('foo')} />
          <MuiFabElement control={control} type="reset">
            Reset
          </MuiFabElement>
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
          <MuiFabElement name="my-fab">Fab</MuiFabElement>
        </FormContainer>
      );
    };

    cy.mount(<WithName />);
    cy.get('button').should('have.attr', 'name', 'my-fab');
  });

  it('submits the parent form when type is submit', () => {
    const onSubmit = cy.stub();

    cy.mount(
      <FormContainer onSubmit={onSubmit}>
        <MuiFabElement type="submit">Submit</MuiFabElement>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit.called).to.equal(true);
    });
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <MuiFabElement disabled>Disabled</MuiFabElement>
      </FormContainer>,
    );

    cy.get('button').should('be.disabled');
  });
});
