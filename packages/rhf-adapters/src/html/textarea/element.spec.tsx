/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { test, expect, vi, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { HtmlTextareaElement } from './element';

describe('HtmlTextareaElement', () => {
  test('forwards the name attribute', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlTextareaElement data-testid="ta" name="my-textarea" />
      </FormContainer>,
    );

    await expect(screen.getByTestId('ta')).toHaveAttribute('name', 'my-textarea');
  });

  test('binds to the form and submits value', async () => {
    const onSubmit = vi.fn();

    const screen = await render(
      <FormContainer onSubmit={(d) => onSubmit(d)}>
        <HtmlTextareaElement data-testid="bio" name="bio" />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </FormContainer>,
    );

    const ta = screen.getByTestId('bio');
    await ta.fill('Hello world');
    await screen.getByTestId('submit').click();

    await expect(onSubmit).toHaveBeenCalledWith({ bio: 'Hello world' });
  });

  test('respects defaultValue prop', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlTextareaElement data-testid="note" defaultValue="init" name="note" />
      </FormContainer>,
    );

    await expect(screen.getByTestId('note')).toHaveValue('init');
  });

  test('applies disabled prop', async () => {
    const screen = await render(
      <FormContainer>
        <HtmlTextareaElement data-testid="disabled" name="x" disabled />
      </FormContainer>,
    );

    await expect(screen.getByTestId('disabled')).toBeDisabled();
  });

  test('calls onError when required validation fails', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();

    const screen = await render(
      <FormContainer onError={(e) => onError(e)} onSubmit={(d) => onSubmit(d)}>
        <HtmlTextareaElement data-testid="desc" name="desc" rules={{ required: true }} />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </FormContainer>,
    );

    await screen.getByTestId('submit').click();

    await expect(onSubmit).not.toHaveBeenCalled();
    await expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    await expect(err).toHaveProperty('desc');
    await expect(err.desc).toHaveProperty('type', 'required');
  });

  test('validates minLength and reports minLength error', async () => {
    const onError = vi.fn();

    const screen = await render(
      <FormContainer onError={(e) => onError(e)} onSubmit={() => {}}>
        <HtmlTextareaElement data-testid="short" name="short" rules={{ minLength: 5 }} />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </FormContainer>,
    );

    const ta = screen.getByTestId('short');
    await ta.fill('123');
    await screen.getByTestId('submit').click();

    expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    expect(err.short).toHaveProperty('type', 'minLength');
  });
});
