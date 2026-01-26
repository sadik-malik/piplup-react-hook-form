import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDatePickerElement } from './element';

describe('MuiXDatePickerElement', () => {
  it('renders initial defaultValue and includes the year', () => {
    const date = dayjs('2021-02-14');
    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Assert the input contains the deterministic formatted date
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
          <MuiXDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Open the calendar popover by clicking the calendar icon button
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
