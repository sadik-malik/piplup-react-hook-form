import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { keyboard, mouse } from 'vitest-browser-commands/playwright';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXTimeFieldElement } from './element';

describe('MuiXTimeFieldElement', () => {
  test('renders default time from defaultValues', async () => {
    const target = dayjs('2021-02-14T08:30:00.000Z');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ time: target }}>
          <MuiXTimeFieldElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const field = screen.getByRole('group');
    await expect.element(field).toBeInTheDocument();
    await expect.element(field).toHaveTextContent(target.format('hh:mm A'));
  });

  test('opens the time selector and selects a time option, updating the displayed time', async () => {
    const target = dayjs().hour(11).minute(45);

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer>
          <MuiXTimeFieldElement name="time" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const field = screen.getByRole('group');
    await expect.element(field).toBeInTheDocument();

    const fieldRect = field.element().getBoundingClientRect();
    await mouse.click(fieldRect.left + fieldRect.width / 2, fieldRect.top + fieldRect.height / 2);
    await keyboard.type(target.format('HHmm'));
    await keyboard.type(target.format('A') === 'AM' ? '{uparrow}' : '{downarrow}');

    await expect.element(field).toHaveTextContent(target.format('hh:mm A'));
  });
});
