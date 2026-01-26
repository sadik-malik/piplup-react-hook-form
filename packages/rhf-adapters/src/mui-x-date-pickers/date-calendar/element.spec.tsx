import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDateCalendarElement } from './element';

describe('MuiXDateCalendarElement', () => {
  it('renders with a default selected date', () => {
    const date = dayjs('2021-02-14');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDateCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // The selected day button should have aria-selected="true"
    cy.get('button[aria-selected="true"]').should(
      'contain',
      String(date.date()),
    );
  });

  it('selects a day when clicked (renders specified month)', () => {
    const target = dayjs('2021-03-10');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer
          defaultValues={{
            date: dayjs('2021-03-01'),
          }}
        >
          <MuiXDateCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Click the visible day button inside the calendar grid
    cy.get('[role="grid"]').within(() => {
      cy.contains('button', String(target.date()))
        .filter(':visible')
        .first()
        .click();
    });

    // Verify the clicked day becomes the selected date
    cy.get('button[aria-selected="true"]').should(
      'contain',
      String(target.date()),
    );
  });
});
