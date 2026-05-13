import * as React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormContainer } from '@piplup/rhf-core';
import dayjs from 'dayjs';
import { MuiXDateFieldElement } from './element';

describe('MuiXDateFieldElement', () => {
  test('renders initial defaultValue formatted', async () => {
    const date = dayjs('2022-04-05');

    const screen = await render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer defaultValues={{ date }}>
          <MuiXDateFieldElement format="MM/DD/YYYY" name="date" />
        </FormContainer>
      </LocalizationProvider>,
    );

    const input = screen.container.querySelector('input');

    expect(input).toBeTruthy();

    await expect.element(input).toHaveValue(date.format('MM/DD/YYYY'));
  });
});
