import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXStaticDatePickerElement } from './element';

describe('MuiXStaticDatePickerElement', () => {
  it('renders with a default selected date', () => {
    const date = dayjs('2021-02-14');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXStaticDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('button[aria-selected="true"]').should(
      'contain',
      String(date.date()),
    );
  });

  it('selects a day when clicked (renders specified month)', () => {
    const target = dayjs('2021-03-10');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dayjs('2021-03-01') }}>
          <MuiXStaticDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[role="grid"]').within(() => {
      cy.contains('button', String(target.date()))
        .filter(':visible')
        .first()
        .click();
    });

    cy.get('button[aria-selected="true"]').should(
      'contain',
      String(target.date()),
    );
  });
});
