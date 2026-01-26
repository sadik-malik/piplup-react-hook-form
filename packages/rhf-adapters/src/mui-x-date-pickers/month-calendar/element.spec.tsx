import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMonthCalendarElement } from './element';

describe('MuiXMonthCalendarElement', () => {
  it('renders with a default selected month', () => {
    const date = dayjs('2021-02-14');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXMonthCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('button[aria-checked="true"]').should('contain', date.format('MMM'));
  });

  it('selects a month when clicked', () => {
    const target = dayjs('2021-07-01');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dayjs('2021-01-01') }}>
          <MuiXMonthCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[role="radiogroup"]').within(() => {
      cy.contains('button', target.format('MMM'))
        .filter(':visible')
        .first()
        .click();
    });

    cy.get('button[aria-checked="true"]').should(
      'contain',
      target.format('MMM'),
    );
  });
});
