import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { NumberFormatBaseElement } from './element';

const format = (val: string) => {
  if (val === '') return '';
  let month = val.substring(0, 2);
  const year = val.substring(2, 4);

  if (month.length === 1 && Number(month[0]) > 1) {
    month = `0${month[0]}`;
  } else if (month.length === 2) {
    // set the lower and upper boundary
    if (Number(month) === 0) {
      month = `01`;
    } else if (Number(month) > 12) {
      month = '12';
    }
  }

  return `${month}/${year}`;
};

const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const target = event.target as HTMLInputElement;
  const { selectionStart, value } = target;
  if (event.key === '/' && selectionStart && value[selectionStart] === '/') {
    // if there is number before slash with just one character add 0 prefix
    if (value.split('/')[0].length === 1) {
      target.value = `0${value}`;
      if (target.selectionStart !== null) target.selectionStart += 1;
    }

    if (target.selectionStart !== null) target.selectionStart += 1;
    event.preventDefault();
  }
};

describe('NumberFormatBase', () => {
  test('renders initial defaultValue formatted', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ cardExpiry: 1213 }} onSubmit={() => {}}>
        <NumberFormatBaseElement format={format} name="cardExpiry" onKeyDown={onKeyDown} />
      </FormContainer>,
    );

    await expect(screen.getByRole('textbox')).toHaveValue('12/13');
  });

  test('formats typed numbers', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <NumberFormatBaseElement format={format} name="cardExpiry" onKeyDown={onKeyDown} />
      </FormContainer>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '0156');
    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveValue('01/56');
  });
});
