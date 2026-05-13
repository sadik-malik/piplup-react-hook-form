import * as React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRatingElement } from './element';

describe('MuiRatingElement', () => {
  test('mounts and allows selecting a rating', async () => {
    const screen = await render(
      <FormContainer>
        <MuiRatingElement name="stars" />
      </FormContainer>,
    );

    // MUI Rating renders radio inputs; click the third star
    const labels = screen.container.querySelectorAll('label');
    await userEvent.click(labels[2]);

    const radios = screen.container.querySelectorAll('input[type=radio]');
    await expect(!!radios[2]).toEqual(true);
    await expect(!!radios[3]).toEqual(true);
    await expect.element(radios[2] as HTMLElement).toBeChecked();
    await expect.element(radios[3] as HTMLElement).not.toBeChecked();
  });

  test('honors defaultValue from form', async () => {
    const screen = await render(
      <FormContainer defaultValues={{ stars: 2 }}>
        <MuiRatingElement name="stars" />
      </FormContainer>,
    );

    const radios = screen.container.querySelectorAll('input[type=radio]');
    await expect(!!radios[1]).toEqual(true);
    await expect(!!radios[2]).toEqual(true);
    await expect.element(radios[1] as HTMLElement).toBeChecked();
    await expect.element(radios[2] as HTMLElement).not.toBeChecked();
  });

  test('forwards the name from adapter when provided via props', async () => {
    const screen = await render(
      <FormContainer>
        <MuiRatingElement name="my-stars" />
      </FormContainer>,
    );

    const radios = screen.container.querySelectorAll('input[type=radio]');
    await expect(!!radios[0]).toEqual(true);
    await expect.element(radios[0] as HTMLElement).toHaveAttribute('name', 'my-stars');
  });

  test('fires onChange when selecting', async () => {
    const onChange = vi.fn();

    const screen = await render(
      <FormContainer>
        <MuiRatingElement name="stars" onChange={(e) => onChange(e)} />
      </FormContainer>,
    );

    const labels = screen.container.querySelectorAll('label');
    await userEvent.click(labels[3]);
    expect(onChange).toHaveBeenCalled();
  });
});
