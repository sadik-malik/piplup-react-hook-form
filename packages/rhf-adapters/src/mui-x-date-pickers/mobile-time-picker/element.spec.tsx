import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { mouse } from 'vitest-browser-commands/playwright';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXMobileTimePickerElement } from './element';

describe('MuiXMobileTimePickerElement', () => {
  test('renders default time from defaultValues', async () => {
    const dt = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXMobileTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(dt.format('HH:mm')));
  });

  test('opens the time picker and selects a time, updating the displayed time', async () => {
    const target = dayjs().hour(9).minute(15);

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXMobileTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const clockIcon = screen.container.querySelector('[data-mui-picker-open-button="true"]');
    await expect.element(clockIcon as HTMLElement).toBeVisible();
    await userEvent.click(clockIcon as HTMLElement);

    const hourOption = screen.getByLabelText(`${target.format('h')} hours`);
    await expect.element(hourOption).toBeVisible();
    const hourOptionRect = hourOption.element().getBoundingClientRect();
    mouse.click(
      hourOptionRect.left + hourOptionRect.width / 2,
      hourOptionRect.top + hourOptionRect.height / 2,
    );

    const minuteOption = screen.getByLabelText(`${target.format('mm')} minutes`);
    await expect.element(minuteOption).toBeVisible();
    const minuteOptionRect = minuteOption.element().getBoundingClientRect();
    mouse.click(
      minuteOptionRect.left + minuteOptionRect.width / 2,
      minuteOptionRect.top + minuteOptionRect.height / 2,
    );

    const okButton = screen.getByRole('button', { name: 'OK' });
    await expect.element(okButton).toBeVisible();
    await userEvent.click(okButton);

    const input = screen.container.querySelector('input');
    expect(input).toBeTruthy();
    await expect.element(input).toHaveValue(expect.stringContaining(target.format('HH:mm')));
  });
});
