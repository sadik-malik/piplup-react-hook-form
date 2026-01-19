import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import {
  useUnstableComposeHelperText as useComposeHelperText,
  type UseComposeHelperTextProps,
} from './use-compose-helper-text';
import { type FormErrorParserFn } from '../../context';
import { FormErrorProvider } from '../../form';

function Comp(props: UseComposeHelperTextProps<FieldValues>) {
  const txt = useComposeHelperText(props);
  return <div data-cy="txt">{String(txt || '')}</div>;
}

describe('useComposeHelperText', () => {
  it('returns helperText when composeHelperText is false', () => {
    cy.mount(<Comp composeHelperText={false} helperText="h" />);
    cy.get('[data-cy=txt]').should('contain.text', 'h');
  });

  it('uses fieldError message when available', () => {
    cy.mount(
      <Comp
        fieldError={{ message: 'err', type: 'custom' }}
        helperText="f"
        composeHelperText
      />,
    );
    cy.get('[data-cy=txt]').should('contain.text', 'err');
  });

  it('honors context-provided parser', () => {
    const parser: FormErrorParserFn = (e) => 'parsed:' + JSON.stringify(e);
    cy.mount(
      <FormErrorProvider errorParser={parser}>
        <Comp
          fieldError={{ message: 'err', type: 'custom' }}
          composeHelperText
        />
      </FormErrorProvider>,
    );

    cy.get('[data-cy=txt]').should('contain.text', 'parsed:');
  });
});
