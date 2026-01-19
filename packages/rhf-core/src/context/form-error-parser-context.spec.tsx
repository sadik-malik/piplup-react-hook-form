import * as React from 'react';
import { FormErrorParserContext } from './form-error-parser-context';

const ReadContext = () => {
  const parser = React.useContext(FormErrorParserContext);
  return <div data-cy="parser">{parser ? 'has' : 'none'}</div>;
};

describe('FormErrorParserContext', () => {
  it('defaults to undefined', () => {
    cy.mount(<ReadContext />);
    cy.get('[data-cy=parser]').should('have.text', 'none');
  });

  it('provides parser from FormErrorProvider', () => {
    const parser = () => ({ message: 'parsed' });
    cy.mount(
      <FormErrorParserContext.Provider value={parser}>
        <ReadContext />
      </FormErrorParserContext.Provider>,
    );
    cy.get('[data-cy=parser]').should('have.text', 'has');
  });
});
