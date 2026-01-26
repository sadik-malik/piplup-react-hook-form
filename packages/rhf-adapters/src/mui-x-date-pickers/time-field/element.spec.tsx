import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXTimeFieldElement } from './element';

describe('MuiXTimeFieldElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXTimeFieldElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .should('contain', dt.format('HH:mm'));
  });

  it('opens the time selector and selects a time option, updating the displayed time', () => {
    const target = dayjs().hour(11).minute(45);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXTimeFieldElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('.MuiPickersTextField-root').first().realClick();
    cy.realType(target.format('HHmm'));
    cy.realType(target.format('A') === 'AM' ? '{uparrow}' : '{downarrow}');

    cy.get('input').invoke('val').should('contain', target.format('HH:mm'));
  });
});
