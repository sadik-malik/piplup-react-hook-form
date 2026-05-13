import * as React from 'react';
import { describe, expect, test } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDesktopDatePickerElement } from './element';

describe('MuiXDesktopDatePickerElement', () => {
  test('renders initial defaultValue and includes the year', async () => {
    const date = dayjs('2021-02-14');
    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDesktopDatePickerElement name="date" />
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
          <MuiXDesktopDatePickerElement name="date" />
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
