import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXStaticTimePickerElement } from './element';
import { mouse } from 'vitest-browser-commands/playwright';

describe('MuiXStaticTimePickerElement', () => {
  test('renders default time from defaultValues', async () => {
    const target = dayjs('2021-02-14T08:30:00.000Z');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: target }}>
          <MuiXStaticTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const hour = screen.container.querySelector(
      '.MuiTimePickerToolbar-hourMinuteLabel button:first-of-type',
    ) as HTMLElement;
    await expect.element(hour).toBeInTheDocument();
    await expect.element(hour).toHaveTextContent(target.format('hh'));

    const minute = screen.container.querySelector(
      '.MuiTimePickerToolbar-hourMinuteLabel button:last-of-type',
    ) as HTMLElement;
    await expect.element(minute).toBeInTheDocument();
    await expect.element(minute).toHaveTextContent(target.format('mm'));

    const meridium = screen.container.querySelector(
      '.MuiTimePickerToolbar-ampmLabel[data-selected="true"]',
    ) as HTMLElement;
    await expect.element(meridium).toBeInTheDocument();
    await expect.element(meridium).toHaveTextContent(target.format('A'));
  });

  test('selects a time option and updates the displayed time', async () => {
    const target = dayjs().hour(9).minute(30);

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXStaticTimePickerElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    // Static time picker renders selectable options; match the combined time label
    const hourBtn = screen.getByLabelText(`${target.format('h')} hours`);
    await expect.element(hourBtn).toBeInTheDocument();
    const hourBtnRect = hourBtn.element().getBoundingClientRect();
    mouse.click(hourBtnRect.left + hourBtnRect.width / 2, hourBtnRect.top + hourBtnRect.height / 2);

    const minuteBtn = screen.getByLabelText(`${target.format('mm')} minutes`);
    await expect.element(minuteBtn).toBeInTheDocument();
    const minuteBtnRect = minuteBtn.element().getBoundingClientRect();
    mouse.click(
      minuteBtnRect.left + minuteBtnRect.width / 2,
      minuteBtnRect.top + minuteBtnRect.height / 2,
    );

    // Verify time
    const hour = screen.container.querySelector(
      '.MuiTimePickerToolbar-hourMinuteLabel button:first-of-type',
    ) as HTMLElement;
    await expect.element(hour).toBeInTheDocument();
    await expect.element(hour).toHaveTextContent(target.format('hh'));

    const minute = screen.container.querySelector(
      '.MuiTimePickerToolbar-hourMinuteLabel button:last-of-type',
    ) as HTMLElement;
    await expect.element(minute).toBeInTheDocument();
    await expect.element(minute).toHaveTextContent(target.format('mm'));

    const meridium = screen.container.querySelector(
      '.MuiTimePickerToolbar-ampmLabel[data-selected="true"]',
    ) as HTMLElement;
    await expect.element(meridium).toBeInTheDocument();
    await expect.element(meridium).toHaveTextContent(target.format('A'));
  });
});
