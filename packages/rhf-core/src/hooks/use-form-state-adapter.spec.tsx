/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFormStateAdapter } from './use-form-state-adapter';

function Consumer(props: { helperText?: React.ReactNode; name?: string }) {
  const adapter = useFormStateAdapter({
    helperText: props.helperText,
    name: props.name,
  });
  return (
    <div data-cy="out" data-error={adapter.error ? '1' : '0'}>
      {String(adapter.helperText || '')}
    </div>
  );
}

function Input({ name }: { name: string }) {
  const { register } = useFormContext();
  return <input data-cy={name} {...register(name, { required: true })} />;
}

describe('useFormStateAdapter', () => {
  it('renders helperText when provided and no errors', async () => {
    const { findByText } = render(
      <FormContainer onSubmit={() => {}}>
        <Consumer helperText="help" />
      </FormContainer>,
    );

    await findByText(/help/);
  });

  it('reflects form errors and composes helper text', async () => {
    const { container } = render(
      <FormContainer onSubmit={() => {}}>
        <Input name="x" />
        <Consumer helperText="fallback" name="x" />
        <button type="submit">S</button>
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);
    expect(container.querySelector('[data-cy=out]')?.getAttribute('data-error')).toBe('1');
  });
});
