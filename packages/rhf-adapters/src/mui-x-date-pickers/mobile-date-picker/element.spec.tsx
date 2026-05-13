import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMobileDatePickerElement } from './element';

describe('MuiXMobileDatePickerElement', () => {
  test('renders initial defaultValue and includes the year', async () => {
    const date = dayjs('2021-02-14');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXMobileDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(date.format('MM/DD/YYYY')));
  });

  test('opens the calendar and selects a day, updating the displayed year', async () => {
    const date = dayjs();

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXMobileDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const calendarIcon = screen.container.querySelector('[data-testid="CalendarIcon"]');
    const openButton = calendarIcon?.closest('button') as HTMLElement;
    await userEvent.click(openButton);

    const dayButton = screen.getByText(String(date.date()));
    await userEvent.click(dayButton);

    const okButton = screen.getByRole('button', { name: 'OK' });
    await userEvent.click(okButton);

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(date.format('YYYY')));
  });
});
