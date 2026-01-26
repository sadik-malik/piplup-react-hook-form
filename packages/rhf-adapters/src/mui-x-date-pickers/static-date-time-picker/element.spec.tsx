import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXStaticDateTimePickerElement } from './element';

describe('MuiXStaticDateTimePickerElement', () => {
  it('renders default date and time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dt }}>
          <MuiXStaticDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      dt.format('YYYY'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      dt.format('MMM'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      dt.format('D'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
      dt.format('HH'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
      dt.format('mm'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-ampmLabel[data-selected="true"]',
      dt.format('A'),
    ).should('exist');
  });

  it('selects a day and updates the input year', () => {
    const target = dayjs('2021-03-14T00:00');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dayjs('2021-03-01') }}>
          <MuiXStaticDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Change datetime
    cy.get('[role="rowgroup"]').within(() => {
      cy.contains('button', target.format('D')).first().click();
    });

    // Verify changed datetime
    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      target.format('YYYY'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      target.format('MMM'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-dateContainer',
      target.format('D'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
      target.format('HH'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
      target.format('mm'),
    ).should('exist');
    cy.contains(
      '.MuiDateTimePickerToolbar-ampmLabel[data-selected="true"]',
      target.format('A'),
    ).should('exist');
  });
});
