import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDateFieldElement } from './element';

describe('MuiXDateFieldElement', () => {
  it('renders initial defaultValue formatted', () => {
    const date = dayjs('2022-04-05');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDateFieldElement format="MM/DD/YYYY" name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .should('exist')
      .invoke('val')
      .should('contain', date.format('MM/DD/YYYY'));
  });
});
