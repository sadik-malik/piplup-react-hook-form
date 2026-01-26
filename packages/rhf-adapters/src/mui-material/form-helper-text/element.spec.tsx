/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';
import { MuiFormHelperTextElement } from './element';

describe('MuiFormHelperTextElement', () => {
  it('renders children as helper text when no error', () => {
    cy.mount(
      <FormContainer>
        <MuiFormHelperTextElement name="helperText">
          Helpful text
        </MuiFormHelperTextElement>
      </FormContainer>,
    );

    cy.get('p').should('contain.text', 'Helpful text');
  });

  it('does not render when renderOnError is true and there is no error', () => {
    cy.mount(
      <FormContainer>
        <MuiFormHelperTextElement name="missing" renderOnError>
          Should not show
        </MuiFormHelperTextElement>
      </FormContainer>,
    );

    cy.get('p').should('not.exist');
  });

  it('shows helper text when field has validation error and renderOnError is true', () => {
    const SubmitForm = () => {
      const { control, handleSubmit, register } = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={handleSubmit(() => {})} noValidate>
          <input data-cy="name" {...register('name', { required: true })} />
          <MuiFormHelperTextElement control={control} name="name" renderOnError>
            Required
          </MuiFormHelperTextElement>
          <button type="submit">Submit</button>
        </form>
      );
    };

    cy.mount(<SubmitForm />);

    cy.get('button[type=submit]').click();
    cy.then(() => {
      cy.get('p').should('contain.text', 'Required');
    });
  });

  it('uses provided errorParser to render parsed message', () => {
    const SubmitForm = () => {
      const methods = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <form onSubmit={methods.handleSubmit(() => {})} noValidate>
          <input
            data-cy="name"
            {...methods.register('name', { required: true })}
          />
          <MuiFormHelperTextElement
            control={methods.control}
            errorParser={() => 'parsed-message'}
            name="name"
            renderOnError
          >
            Required
          </MuiFormHelperTextElement>
          <button type="submit">Submit</button>
        </form>
      );
    };

    cy.mount(<SubmitForm />);

    cy.get('button[type=submit]').click();
    cy.then(() => {
      cy.get('p').should('contain.text', 'parsed-message');
    });
  });
});
