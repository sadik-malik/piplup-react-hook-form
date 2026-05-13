import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDateCalendarElement } from './element';

describe('MuiXDateCalendarElement', () => {
  test('renders with a default selected date', async () => {
    const date = dayjs('2021-02-14');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDateCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const selectedDay = screen.getByRole('gridcell', {
      selected: true,
    });

    await expect.element(selectedDay).toHaveTextContent(String(date.date()));
  });

  test('selects a day when clicked (renders specified month)', async () => {
    const target = dayjs('2021-03-10');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer
          defaultValues={{
            date: dayjs('2021-03-01'),
          }}
        >
          <MuiXDateCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const dayButton = screen.getByText(String(target.date()));

    await expect.element(dayButton).toBeVisible();

    await dayButton.click();

    const selectedDay = screen.getByRole('gridcell', {
      selected: true,
    });

    await expect.element(selectedDay).toHaveTextContent(String(target.date()));
  });
});
