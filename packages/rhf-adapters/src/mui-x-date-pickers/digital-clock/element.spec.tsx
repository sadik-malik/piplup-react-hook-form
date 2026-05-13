import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDigitalClockElement } from './element';

describe('MuiXDigitalClockElement', () => {
  test('renders default time from defaultValues', async () => {
    const dt = dayjs('2021-02-14T08:30');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: dt }}>
          <MuiXDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const selected = screen.container.querySelector('[aria-selected="true"]');
    expect(selected).toBeTruthy();
    await expect.element(selected as HTMLElement).toHaveTextContent(dt.format('HH:mm A'));
  });

  test('select a time, updating the displayed time', async () => {
    const target = dayjs().hour(9).minute(0);

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXDigitalClockElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const option = screen.getByRole('option', { name: target.format('hh:mm A') });
    await userEvent.click(option);

    const selected = screen.container.querySelector('[aria-selected="true"]');
    expect(selected).toBeTruthy();
    await expect.element(selected as HTMLElement).toHaveTextContent(target.format('HH:mm A'));
  });
});
