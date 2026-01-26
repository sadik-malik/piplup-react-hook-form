import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMobileTimePickerElement } from './element';

describe('MuiXMobileTimePickerElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXMobileTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .should('contain', dt.format('HH:mm'));
  });

  it('opens the time picker and selects a time, updating the displayed time', () => {
    const target = dayjs().hour(9).minute(15);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXMobileTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[data-testid="ClockIcon"]')
      .should('exist')
      .closest('button')
      .click();

    cy.then(() => {
      cy.contains('[role="option"]', target.format('H')).first().realTouch();
      cy.then(() => {
        cy.contains('[role="option"]', target.format('mm')).first().realTouch();
        cy.contains('button', 'OK').first().realTouch();
      });
    });

    cy.get('input').invoke('val').should('contain', target.format('HH:mm'));
  });
});
