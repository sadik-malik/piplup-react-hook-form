import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXTimePickerElement } from './element';

describe('MuiXTimePickerElement', () => {
  it('renders default time from defaultValues', () => {
    const dt = dayjs('2021-02-14T08:30');

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('input')
      .first()
      .invoke('val')
      .should('contain', dt.format('HH:mm A'));
  });

  it('select a time, updating the displayed time', () => {
    const target = dayjs().hour(9).minute(0);

    cy.mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    cy.get('[data-testid="ClockIcon"]').first().click();
    cy.get('[role="dialog"]').within(() => {
      cy.get('[aria-label="Select hours"]').within(() => {
        cy.contains('[role="option"]', target.format('HH')).first().click();
      });
      cy.get('[aria-label="Select minutes"]').within(() => {
        cy.contains('[role="option"]', target.format('mm')).first().click();
      });
      cy.get('[aria-label="Select meridiem"]').within(() => {
        cy.contains('[role="option"]', target.format('A')).first().click();
      });
      cy.contains('button', 'OK').click();
    });

    cy.get('input')
      .first()
      .invoke('val')
      .should('contain', target.format('HH:mm A'));
  });
});
