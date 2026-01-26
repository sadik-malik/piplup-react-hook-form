import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXStaticTimePickerElement } from './element';

describe('MuiXStaticTimePickerElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXStaticTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.contains(
      '.MuiTimePickerToolbar-hourMinuteLabel',
      dt.format('HH'),
    ).should('exist');
    cy.contains(
      '.MuiTimePickerToolbar-hourMinuteLabel',
      dt.format('mm'),
    ).should('exist');
    cy.contains(
      '.MuiTimePickerToolbar-ampmLabel[data-selected="true"]',
      dt.format('A'),
    ).should('exist');
  });

  it('selects a time option and updates the displayed time', () => {
    const target = dayjs().hour(9).minute(30);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXStaticTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Static time picker renders selectable options; match the combined time label
    cy.get(`[aria-label="${target.format('H')} hours"]`)
      .first()
      .realClick();
    cy.then(() => {
      cy.get(`[aria-label="${target.format('mm')} minutes"]`)
        .first()
        .realClick();
    });

    // Verify time
    cy.contains(
      '.MuiTimePickerToolbar-hourMinuteLabel',
      target.format('HH'),
    ).should('exist');
    cy.contains(
      '.MuiTimePickerToolbar-hourMinuteLabel',
      target.format('mm'),
    ).should('exist');
    cy.contains(
      '.MuiTimePickerToolbar-ampmLabel[data-selected="true"]',
      target.format('A'),
    ).should('exist');
  });
});
