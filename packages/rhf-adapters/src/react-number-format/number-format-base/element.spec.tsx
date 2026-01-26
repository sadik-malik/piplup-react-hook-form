/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { NumberFormatBaseElement } from './element';

const format = (val: string) => {
  if (val === '') return '';
  let month = val.substring(0, 2);
  const year = val.substring(2, 4);

  if (month.length === 1 && Number(month[0]) > 1) {
    month = `0${month[0]}`;
  } else if (month.length === 2) {
    // set the lower and upper boundary
    if (Number(month) === 0) {
      month = `01`;
    } else if (Number(month) > 12) {
      month = '12';
    }
  }

  return `${month}/${year}`;
};

const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const target = event.target as HTMLInputElement;
  const { selectionStart, value } = target;
  if (event.key === '/' && selectionStart && value[selectionStart] === '/') {
    // if there is number before slash with just one character add 0 prefix
    if (value.split('/')[0].length === 1) {
      target.value = `0${value}`;
      if (target.selectionStart !== null) target.selectionStart += 1;
    }

    if (target.selectionStart !== null) target.selectionStart += 1;
    event.preventDefault();
  }
};

describe('NumberFormatBaseElement', () => {
  it('renders initial defaultValue formatted', () => {
    cy.mount(
      <FormContainer defaultValues={{ cardExpiry: 1213 }} onSubmit={() => {}}>
        <NumberFormatBaseElement
          format={format}
          name="cardExpiry"
          onKeyDown={onKeyDown}
        />
      </FormContainer>,
    );

    cy.get('input').should('exist').and('have.value', '12/13');
  });

  it('formats typed numbers', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <NumberFormatBaseElement
          format={format}
          name="cardExpiry"
          onKeyDown={onKeyDown}
        />
      </FormContainer>,
    );

    cy.get('input').should('exist').clear();
    cy.get('input').type('0156{enter}');
    cy.get('input').should('have.value', '01/56');
  });
});
