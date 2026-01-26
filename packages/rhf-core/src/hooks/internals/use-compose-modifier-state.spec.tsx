import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import {
  useUnstableComposeModifierState as useComposeModifierState,
  type UseComposeModifierStateProps,
} from './use-compose-modifier-state';

function Comp(props: UseComposeModifierStateProps<FieldValues>) {
  const state = useComposeModifierState(props);
  return (
    <div
      data-cy="s"
      data-disabled={state.disabled ? '1' : '0'}
      data-error={state.error ? '1' : '0'}
    />
  );
}

describe('useComposeModifierState', () => {
  it('computes disabled from disabled prop', () => {
    cy.mount(<Comp disabled />);
    cy.get('[data-cy=s]').should('have.attr', 'data-disabled', '1');
  });

  it('disables on error when disableOnError true', () => {
    cy.mount(
      <Comp
        fieldError={{ a: { message: 'x', type: 'custom' } }}
        disableOnError
      />,
    );
    cy.get('[data-cy=s]').should('have.attr', 'data-disabled', '1');
    cy.get('[data-cy=s]').should('have.attr', 'data-error', '1');
  });

  it('disables on submitting when disableOnIsSubmitting true', () => {
    cy.mount(<Comp disableOnIsSubmitting isSubmitting />);
    cy.get('[data-cy=s]').should('have.attr', 'data-disabled', '1');
  });
});
