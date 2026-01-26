import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMultiSectionDigitalClockElement } from './element';

describe('MuiXMultiSectionDigitalClockElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXMultiSectionDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[aria-label="Select hours"]').within(() => {
      cy.contains('[aria-selected="true"]', dt.format('HH')).should('exist');
    });
    cy.get('[aria-label="Select minutes"]').within(() => {
      cy.contains('[aria-selected="true"]', dt.format('mm')).should('exist');
    });

    cy.get('[aria-label="Select meridiem"]').within(() => {
      cy.contains('[aria-selected="true"]', dt.format('A')).should('exist');
    });
  });

  it('elects a time option, updating the displayed time', () => {
    const target = dayjs().hour(9).minute(15);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXMultiSectionDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[aria-label="Select hours"]').within(() => {
      cy.contains('[role="option"]', target.format('HH')).first().click();
    });
    cy.get('[aria-label="Select minutes"]').within(() => {
      cy.contains('[role="option"]', target.format('mm')).first().click();
    });

    cy.get('[aria-label="Select meridiem"]').within(() => {
      cy.contains('[role="option"]', target.format('A')).first().click();
    });

    // Verify the values
    cy.get('[aria-label="Select hours"]').within(() => {
      cy.contains('[aria-selected="true"]', target.format('HH')).should(
        'exist',
      );
    });
    cy.get('[aria-label="Select minutes"]').within(() => {
      cy.contains('[aria-selected="true"]', target.format('mm')).should(
        'exist',
      );
    });

    cy.get('[aria-label="Select meridiem"]').within(() => {
      cy.contains('[aria-selected="true"]', target.format('A')).should('exist');
    });
  });
});
