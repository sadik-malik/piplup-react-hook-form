import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXTimeClockElement } from './element';

describe('MuiXTimeClockElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXTimeClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.contains('[role="option"][aria-selected="true"]', dt.format('H')).should(
      'exist',
    );
    cy.contains('[role="option"][aria-selected="true"]', dt.format('H'))
      .first()
      .realClick();
    cy.contains(
      '[role="option"][aria-selected="true"]',
      dt.format('mm'),
    ).should('exist');
  });
});
