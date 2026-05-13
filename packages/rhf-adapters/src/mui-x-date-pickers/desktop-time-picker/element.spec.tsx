import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDesktopTimePickerElement } from './element';

describe('MuiXDesktopTimePickerElement', () => {
  test('renders default time from defaultValues', async () => {
    const dt = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXDesktopTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();

    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('HH:mm')));
  });

  test('opens the time picker and selects a time, updating the displayed time', async () => {
    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDesktopTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const clockIcon = screen.container.querySelector('[data-testid="ClockIcon"]');
    const openButton = clockIcon?.closest('button') as HTMLElement;
    await userEvent.click(openButton);

    const hourEl = screen.getByLabelText('9 hours');
    await userEvent.click(hourEl);

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining('09:'));
  });
});
