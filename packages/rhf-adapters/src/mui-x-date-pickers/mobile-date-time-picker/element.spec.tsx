import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMobileDateTimePickerElement } from './element';

describe('MuiXMobileDateTimePickerElement', () => {
  it('renders default date and time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dt }}>
          <MuiXMobileDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .then((val) => {
        expect(String(val)).to.contain(dt.format('MM/DD/YYYY'));
        expect(String(val)).to.contain(dt.format('HH:mm'));
      });
  });

  it('opens calendar, selects a day and updates the input year', () => {
    const target = dayjs('2021-03-14T09:45');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dayjs('2021-03-01') }}>
          <MuiXMobileDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Open calendar via calendar icon button
    cy.get('[data-testid="CalendarIcon"]')
      .should('exist')
      .closest('button')
      .realTouch();

    // Click the day inside the calendar grid
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', String(target.date()))
        .filter(':visible')
        .first()
        .realTouch();

      cy.contains('button', 'Next').first().realTouch();
      cy.then(() => {
        cy.contains('button', 'OK').first().realTouch();
      });
    });

    // Assert input contains selected year
    cy.get('input').invoke('val').should('contain', target.format('YYYY'));
  });
});
