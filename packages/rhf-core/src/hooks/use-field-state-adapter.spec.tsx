/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';
import { FormContainer } from '../form';
import {
  useFieldStateAdapter,
  type UseFieldStateAdapterProps,
} from './use-field-state-adapter';

function AdapterConsumer<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseFieldStateAdapterProps<TFieldValues, TName>) {
  const {
    className,
    disabled,
    error,
    helperText: composedHelperText,
    style: styleOut,
  } = useFieldStateAdapter(props);

  return (
    <p
      aria-disabled={disabled}
      className={className}
      data-cy="helper"
      data-error={error ? 'true' : 'false'}
      style={styleOut}
    >
      {composedHelperText}
    </p>
  );
}

const InputRequired = () => {
  const { register } = useFormContext();
  return <input data-cy="input" {...register('name', { required: true })} />;
};

describe('useFieldStateAdapter', () => {
  it('renders provided helperText', () => {
    cy.mount(
      <FormContainer>
        <AdapterConsumer helperText="Helpful" name="a" />
      </FormContainer>,
    );

    cy.get('[data-cy=helper]').should('contain.text', 'Helpful');
    cy.get('[data-cy=helper]').should('have.attr', 'data-error', 'false');
  });

  it('reflects field error when validation fails', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <InputRequired />
        <AdapterConsumer helperText="Required" name="name" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();
    cy.then(() => {
      cy.get('[data-cy=helper]').should('have.attr', 'data-error', 'true');
    });
  });

  it('applies styles conditionally in case of error', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <InputRequired />
        <AdapterConsumer
          style={(modifierState) =>
            modifierState.error ? { color: 'rgb(255, 0, 0)' } : {}
          }
          helperText="H"
          name="name"
        />
        <button type="submit">Submit</button>
      </FormContainer>,
    );
    cy.get('button[type=submit]').click();
    cy.then(() => {
      cy.get('[data-cy=helper]').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
