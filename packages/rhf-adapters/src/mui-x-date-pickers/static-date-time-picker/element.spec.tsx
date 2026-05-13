import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXStaticDateTimePickerElement } from './element';

describe('MuiXStaticDateTimePickerElement', () => {
  test('renders default date and time from defaultValues', async () => {
    const target = dayjs('2021-02-14T08:30:00.000Z');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: target }}>
          <MuiXStaticDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const year = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-dateContainer button:first-of-type',
    ) as HTMLElement;
    await expect.element(year).toBeInTheDocument();
    await expect.element(year).toHaveTextContent(target.format('YYYY'));

    const day = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-dateContainer button:last-of-type',
    ) as HTMLElement;
    await expect.element(day).toBeInTheDocument();
    await expect.element(day).toHaveTextContent(target.format('MMM D'));

    const timeDigits = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
    ) as HTMLElement;
    await expect.element(timeDigits).toBeInTheDocument();
    await expect.element(timeDigits).toHaveTextContent(target.format('hh:mm'));

    const meridiem = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-ampmLabel[data-selected="true"]',
    ) as HTMLElement;
    await expect.element(meridiem).toBeInTheDocument();
    await expect.element(meridiem).toHaveTextContent(target.format('A'));
  });

  test('selects a day and updates the input year', async () => {
    const target = dayjs('2021-03-14T00:00:00.000Z');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ datetime: dayjs('2021-03-01T00:00:00.000Z') }}>
          <MuiXStaticDateTimePickerElement name="datetime" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Change datetime
    await screen
      .getByRole('gridcell', {
        name: target.format('D'),
      })
      .click();

    // Verify changed datetime
    const year = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-dateContainer button:first-of-type',
    ) as HTMLElement;
    await expect.element(year).toBeInTheDocument();
    await expect.element(year).toHaveTextContent(target.format('YYYY'));

    const day = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-dateContainer button:last-of-type',
    ) as HTMLElement;
    await expect.element(day).toBeInTheDocument();
    await expect.element(day).toHaveTextContent(target.format('MMM D'));

    const timeDigits = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-timeDigitsContainer',
    ) as HTMLElement;
    await expect.element(timeDigits).toBeInTheDocument();
    await expect.element(timeDigits).toHaveTextContent(target.format('hh:mm'));

    const meridiem = screen.container.querySelector(
      '.MuiDateTimePickerToolbar-ampmLabel[data-selected="true"]',
    ) as HTMLElement;
    await expect.element(meridiem).toBeInTheDocument();
    await expect.element(meridiem).toHaveTextContent(target.format('A'));
  });
});
