import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXYearCalendarElement } from './element';

describe('MuiXYearCalendarElement', () => {
  test('renders with a default selected year', async () => {
    const target = dayjs('2021-02-14');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: target }}>
          <MuiXYearCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const year = screen.getByRole('radio', {
      name: target.format('YYYY'),
    });
    await expect.element(year).toHaveAttribute('aria-checked', 'true');
  });

  test('selects a year when clicked', async () => {
    const target = dayjs('2025-01-01');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date: dayjs('2021-01-01') }}>
          <MuiXYearCalendarElement name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const year = screen.getByRole('radio', {
      name: target.format('YYYY'),
    });
    await userEvent.click(year);
    await expect.element(year).toHaveAttribute('aria-checked', 'true');
  });
});
