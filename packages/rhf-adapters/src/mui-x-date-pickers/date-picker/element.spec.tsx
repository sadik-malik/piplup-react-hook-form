import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDatePickerElement } from './element';
import { userEvent } from 'vitest/browser';

describe('MuiXDatePickerElement', () => {
  test('renders initial defaultValue and includes the year', async () => {
    const date = dayjs('2021-02-14');
    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(date.format('MM/DD/YYYY'));
  });

  test('opens the calendar and selects a day, updating the displayed year', async () => {
    const date = dayjs();
    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDatePickerElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const openButton = screen.getByLabelText(/choose date/i);
    await userEvent.click(openButton);

    const dayButton = screen.getByText(String(date.date()));
    await userEvent.click(dayButton);

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(date.format('YYYY')));
  });
});
