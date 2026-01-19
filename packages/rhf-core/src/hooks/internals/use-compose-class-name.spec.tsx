import * as React from 'react';
import {
  useUnstableComposeClassName as useComposeClassName,
  type UseComposeClassNameProps,
} from './use-compose-class-name';

afterEach(() => Cypress.$.fn && Cypress.$.fn.detach);

function Comp(props: UseComposeClassNameProps) {
  const cls = useComposeClassName(props);
  return <div data-cy="cls">{cls || ''}</div>;
}

describe('useComposeClassName', () => {
  it('returns provided className when composeClassName is false', () => {
    cy.mount(
      <Comp
        classes={{ disabled: 'disabled', error: 'error', root: 'root' }}
        className="base"
        composeClassName={false}
        modifierState={{ disabled: true, error: true }}
      />,
    );
    cy.get('[data-cy=cls]').should('contain.text', 'base');
  });

  it('composes classes from modifierState and classes map', () => {
    cy.mount(
      <Comp
        classes={{ disabled: 'disabled', error: 'error', root: 'root' }}
        className="extra"
        modifierState={{ disabled: true, error: true }}
        composeClassName
      />,
    );

    cy.get('[data-cy=cls]').should('contain.text', 'root');
    cy.get('[data-cy=cls]').should('contain.text', 'disabled');
    cy.get('[data-cy=cls]').should('contain.text', 'error');
    cy.get('[data-cy=cls]').should('contain.text', 'extra');
  });
});
