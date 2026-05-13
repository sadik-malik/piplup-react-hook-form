import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDesktopDateTimePickerElement } from './element';

describe('MuiXDesktopDateTimePickerElement', () => {
  test('renders default date and time from defaultValues', async () => {
    const dt = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dt }}>
          <MuiXDesktopDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');

    expect(input).toBeTruthy();

    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('MM/DD/YYYY')));
    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('HH:mm')));
  });

  test('opens calendar, selects a day and updates the input year', async () => {
    const target = dayjs('2021-03-14T00:00');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dayjs('2021-03-01') }}>
          <MuiXDesktopDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const button = screen.getByLabelText('Choose date');
    await button.click();

    const dayButton = screen.getByText(String(target.date()));
    await expect.element(dayButton).toBeVisible();
    await dayButton.click();

    const okButton = screen.getByRole('button', { name: 'OK' });
    await expect.element(okButton).toBeVisible();
    await okButton.click();

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(target.format('MM/DD/YYYY hh:mm A'));
  });
});
