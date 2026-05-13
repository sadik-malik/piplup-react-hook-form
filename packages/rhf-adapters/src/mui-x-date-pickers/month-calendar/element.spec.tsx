import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMonthCalendarElement } from './element';

describe('MuiXMonthCalendarElement', () => {
  test('renders with a default selected month', async () => {
    const date = dayjs('2021-02-14');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXMonthCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const month = screen.getByLabelText(date.format('MMMM'));
    expect(month).toBeTruthy();
    await expect.element(month).toHaveAttribute('aria-checked', 'true');
  });

  test('selects a month when clicked', async () => {
    const target = dayjs('2021-07-01');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dayjs('2021-01-01') }}>
          <MuiXMonthCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const monthButton = screen.getByText(target.format('MMM'));
    await expect.element(monthButton).toBeVisible();
    await userEvent.click(monthButton);

    await expect.element(monthButton).toHaveAttribute('aria-checked', 'true');
  });
});
