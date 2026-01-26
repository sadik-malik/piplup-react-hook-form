import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDigitalClockElement } from './element';

describe('MuiXDigitalClockElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[aria-selected="true"]')
      .should('exist')
      .should('contain', dt.format('HH:mm'));
  });

  it('select a time, updating the displayed time', () => {
    const target = dayjs().hour(9).minute(0);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.contains('[role="option"]', target.format('hh:mm A'))
      .first()
      .scrollIntoView();

    cy.contains('[role="option"]', target.format('hh:mm A')).first().click();

    cy.get('[aria-selected="true"]')
      .should('exist')
      .should('contain', target.format('HH:mm'));
  });
});
