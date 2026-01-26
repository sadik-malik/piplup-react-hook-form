import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDesktopTimePickerElement } from './element';

describe('MuiXDesktopTimePickerElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXDesktopTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .should('contain', dt.format('HH:mm'));
  });

  it('opens the time picker and selects a time, updating the displayed time', () => {
    const date = dayjs();
    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDesktopTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Open the calendar popover by clicking the calendar icon button
    cy.get('[data-testid="ClockIcon"]')
      .should('exist')
      .closest('button')
      .click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains('[aria-label="9 hours"]', '09').first().scrollIntoView();
      cy.then(() => {
        cy.contains('[aria-label="9 hours"]', '09').first().click();
      });
    });

    cy.get('input').invoke('val').should('contain', date.format('09:'));
  });
});
