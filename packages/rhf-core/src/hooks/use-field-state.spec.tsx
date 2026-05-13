import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFieldState } from './use-field-state';

function InputRegister({
  name,
  rules,
}: {
  name: string;
  rules?: RegisterOptions<FieldValues, string>;
}) {
  const { register } = useFormContext();
  return <input data-cy="input" {...register(name, rules)} />;
}

function FieldStateConsumer({ name }: { name: string }) {
  const state = useFieldState({ name });
  return (
    <div>
      <span data-cy="error">{state.error ? '1' : '0'}</span>
      <span data-cy="invalid">{state.invalid ? '1' : '0'}</span>
      <span data-cy="dirty">{state.isDirty ? '1' : '0'}</span>
      <span data-cy="touched">{state.isTouched ? '1' : '0'}</span>
    </div>
  );
}

describe('useFieldState', () => {
  it('initially has no error, not dirty, not touched', () => {
    const { container } = render(
      <FormContainer>
        <InputRegister name="name" />
        <FieldStateConsumer name="name" />
      </FormContainer>,
    );

    expect(container.querySelector('[data-cy=error]')?.textContent).toContain('0');
    expect(container.querySelector('[data-cy=invalid]')?.textContent).toContain('0');
    expect(container.querySelector('[data-cy=dirty]')?.textContent).toContain('0');
    expect(container.querySelector('[data-cy=touched]')?.textContent).toContain('0');
  });

  it('marks dirty when value changes and touched on blur', async () => {
    const { container } = render(
      <FormContainer>
        <InputRegister name="name" />
        <FieldStateConsumer name="name" />
      </FormContainer>,
    );

    expect(container.querySelector('[data-cy=dirty]')?.textContent).toContain('0');
    const input = container.querySelector('[data-cy=input]') as HTMLInputElement;
    await userEvent.type(input, 'X');
    expect(container.querySelector('[data-cy=dirty]')?.textContent).toContain('1');

    expect(container.querySelector('[data-cy=touched]')?.textContent).toContain('0');
    fireEvent.blur(input);
    expect(container.querySelector('[data-cy=touched]')?.textContent).toContain('1');
  });

  it('reports validation error when submit without required value', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();

    const { container } = render(
      <FormContainer onError={(e) => onError(e)} onSubmit={() => onSubmit()}>
        <InputRegister name="name" rules={{ required: true }} />
        <FieldStateConsumer name="name" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    expect(err).toHaveProperty('name');

    expect(container.querySelector('[data-cy=error]')?.textContent).toContain('1');
    expect(container.querySelector('[data-cy=invalid]')?.textContent).toContain('1');
  });
});
