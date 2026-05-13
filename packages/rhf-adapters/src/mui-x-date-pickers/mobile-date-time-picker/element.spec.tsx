import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMobileDateTimePickerElement } from './element';

describe('MuiXMobileDateTimePickerElement', () => {
  test('renders default date and time from defaultValues', async () => {
    const dt = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dt }}>
          <MuiXMobileDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('MM/DD/YYYY')));
    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('HH:mm')));
  });

  test('opens calendar, selects a day and updates the input year', async () => {
    const target = dayjs('2021-03-14T09:45');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dayjs('2021-03-01') }}>
          <MuiXMobileDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const calendarIcon = screen.container.querySelector('[data-testid="CalendarIcon"]');
    const openButton = calendarIcon?.closest('button') as HTMLElement;
    await expect.element(openButton).toBeVisible();
    await openButton.click();

    const dayButton = screen.getByText(String(target.date()));
    await expect.element(dayButton).toBeVisible();
    await dayButton.click();

    const dialog = (await screen.getByRole('dialog').element()) as HTMLElement;
    const nextButton = Array.from(dialog.querySelectorAll('button')).find((b) =>
      /next/i.test(String(b.textContent)),
    );
    expect(nextButton).toBeTruthy();
    await expect.element(nextButton as HTMLElement).toBeVisible();
    await userEvent.click(nextButton as HTMLElement);

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(target.format('YYYY')));
  });
});
