import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXYearCalendarElement } from './element';

describe('MuiXYearCalendarElement', () => {
  it('renders with a default selected year', () => {
    const dt = dayjs('2021-02-14');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dt }}>
          <MuiXYearCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('button[aria-checked="true"]').should('contain', dt.format('YYYY'));
  });

  it('selects a year when clicked', () => {
    const target = dayjs('2025-01-01');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dayjs('2021-01-01') }}>
          <MuiXYearCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[role="radiogroup"]').within(() => {
      cy.contains('button', target.format('YYYY'))
        .filter(':visible')
        .first()
        .click();
    });

    cy.get('button[aria-checked="true"]').should(
      'contain',
      target.format('YYYY'),
    );
  });
});
