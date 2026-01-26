import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import {
  useUnstableComposeRules as useComposeRules,
  type UseComposeRulesProps,
} from './use-compose-rules';

function Comp(props: UseComposeRulesProps<FieldValues>) {
  const r = useComposeRules(props);
  return <div data-cy="r">{JSON.stringify(r)}</div>;
}

describe('useComposeRules', () => {
  it('adds required message when required true', () => {
    cy.mount(<Comp required />);
    cy.get('[data-cy=r]').should('contain.text', 'required');
  });

  it('populates minLength rule with value and message', () => {
    cy.mount(<Comp minLength={5} />);
    cy.get('[data-cy=r]').should('contain.text', 'minLength');
    cy.get('[data-cy=r]').should('contain.text', '5');
  });

  it('converts pattern string to RegExp and message present', () => {
    cy.mount(<Comp pattern="^a" />);
    cy.get('[data-cy=r]').should('contain.text', 'pattern');
  });
});
