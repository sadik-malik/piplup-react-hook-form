import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDesktopDatePickerElement } from './element';

describe('MuiXDesktopDatePickerElement', () => {
  it('renders initial defaultValue and includes the year', () => {
    const date = dayjs('2021-02-14');
    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDesktopDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .should('contain', date.format('MM/DD/YYYY'));
  });

  it('opens the calendar and selects a day, updating the displayed year', () => {
    const date = dayjs();
    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDesktopDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[data-testid="CalendarIcon"]')
      .should('exist')
      .closest('button')
      .click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', String(date.date()))
        .filter(':visible')
        .first()
        .click();
    });

    cy.get('input').invoke('val').should('contain', date.format('YYYY'));
  });
});
