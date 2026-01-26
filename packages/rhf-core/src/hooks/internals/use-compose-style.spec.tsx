import * as React from 'react';
import {
  useUnstableComposeStyle as useComposeStyle,
  type UseComposeStyleProps,
} from './use-compose-style';

function Comp(props: UseComposeStyleProps) {
  const s = useComposeStyle(props);
  return <div data-cy="s">{JSON.stringify(s)}</div>;
}

describe('useComposeStyle', () => {
  it('applies style object directly', () => {
    cy.mount(
      <Comp
        modifierState={{ disabled: false, error: false }}
        style={{ color: 'red' }}
      />,
    );
    cy.get('[data-cy=s]').should('contain.text', 'red');
  });

  it('calls style function with modifierState', () => {
    cy.mount(
      <Comp
        modifierState={{ disabled: true, error: false }}
        style={(m) => ({ color: m.disabled ? 'gray' : 'blue' })}
      />,
    );
    cy.get('[data-cy=s]').should('contain.text', 'gray');
  });
});
