import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFormReset } from './use-form-reset';

function InputRegister({ name }: { name: string }) {
  const { register } = useFormContext();
  return <input data-cy={name} {...register(name)} />;
}

function ResetButtons() {
  const reset = useFormReset({});
  return (
    <div>
      <button data-cy="reset" onClick={() => reset()} type="button">
        Reset
      </button>
      <button data-cy="reset-new" onClick={() => reset({ name: 'new-value' })} type="button">
        Reset To New
      </button>
      <button
        data-cy="reset-fn"
        onClick={() => reset((prev) => ({ ...prev, name: 'from-fn' }))}
        type="button"
      >
        Reset Fn
      </button>
    </div>
  );
}

describe('useFormReset', () => {
  it('resets form values to default values', async () => {
    const { container } = render(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    const input = container.querySelector('[data-cy=name]') as HTMLInputElement;
    expect(input.value).toBe('init');
    await userEvent.clear(input);
    await userEvent.type(input, 'changed');
    expect(input.value).toBe('changed');

    await userEvent.click(container.querySelector('[data-cy=reset]') as HTMLButtonElement);
    expect((container.querySelector('[data-cy=name]') as HTMLInputElement).value).toBe('init');
  });

  it('resets to provided values when passed an object', async () => {
    const { container } = render(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    const input = container.querySelector('[data-cy=name]') as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, 'changed');
    await userEvent.click(container.querySelector('[data-cy=reset-new]') as HTMLButtonElement);
    expect((container.querySelector('[data-cy=name]') as HTMLInputElement).value).toBe('new-value');
  });

  it('resets using a function argument', async () => {
    const { container } = render(
      <FormContainer defaultValues={{ name: 'init' }}>
        <InputRegister name="name" />
        <ResetButtons />
      </FormContainer>,
    );

    const input = container.querySelector('[data-cy=name]') as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, 'something');
    await userEvent.click(container.querySelector('[data-cy=reset-fn]') as HTMLButtonElement);
    expect((container.querySelector('[data-cy=name]') as HTMLInputElement).value).toBe('from-fn');
  });
});
