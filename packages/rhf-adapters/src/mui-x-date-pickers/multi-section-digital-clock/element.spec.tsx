import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMultiSectionDigitalClockElement } from './element';

describe('MuiXMultiSectionDigitalClockElement', () => {
  test('renders default time from defaultValues', async () => {
    const target = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: target }}>
          <MuiXMultiSectionDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const selectHours = screen.getByLabelText('Select hours');
    const targetHour = selectHours.getByText(target.format('HH'));
    await expect.element(targetHour).toHaveAttribute('aria-selected', 'true');

    const selectMinutes = screen.getByLabelText('Select minutes');
    const targetMinute = selectMinutes.getByText(target.format('mm'));
    await expect.element(targetMinute).toHaveAttribute('aria-selected', 'true');

    const selectMeridiem = screen.getByLabelText('Select meridiem');
    const targetMerdiem = selectMeridiem.getByText(target.format('A'));
    await expect.element(targetMerdiem).toHaveAttribute('aria-selected', 'true');
  });

  test('elects a time option, updating the displayed time', async () => {
    const target = dayjs().hour(9).minute(15);

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXMultiSectionDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const selectHours = screen.getByLabelText('Select hours');
    const targetHour = selectHours.getByText(target.format('HH'));
    await userEvent.click(targetHour);

    const selectMinutes = screen.getByLabelText('Select minutes');
    const targetMinute = selectMinutes.getByText(target.format('mm'));
    await userEvent.click(targetMinute);

    const selectMeridiem = screen.getByLabelText('Select meridiem');
    const targetMerdiem = selectMeridiem.getByText(target.format('A'));
    await userEvent.click(targetMerdiem);

    // Verify the values
    await expect.element(targetHour).toHaveAttribute('aria-selected', 'true');
    await expect.element(targetMinute).toHaveAttribute('aria-selected', 'true');
    await expect.element(targetMerdiem).toHaveAttribute('aria-selected', 'true');
  });
});
