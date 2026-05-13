import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFormSetFocus } from './use-form-set-focus';

function InputRegister({ defaultValue, name }: { defaultValue?: string; name: string }) {
  const { register } = useFormContext();
  return <input data-cy={name} defaultValue={defaultValue} {...register(name)} />;
}

function FocusButtons() {
  const setFocus = useFormSetFocus({});
  return (
    <div>
      <button data-cy="focus" onClick={() => setFocus('name')} type="button">
        Focus
      </button>
      <button
        data-cy="focus-select"
        onClick={() => setFocus('name', { shouldSelect: true })}
        type="button"
      >
        Focus & Select
      </button>
    </div>
  );
}

describe('useFormSetFocus', () => {
  it('focuses the registered field when setFocus is called', async () => {
    const { container } = render(
      <FormContainer>
        <InputRegister name="name" />
        <FocusButtons />
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('[data-cy=focus]') as HTMLButtonElement);
    const input = container.querySelector('[data-cy=name]') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
  });

  it('selects the field value when shouldSelect is true', async () => {
    const { container } = render(
      <FormContainer>
        <InputRegister defaultValue="hello" name="name" />
        <FocusButtons />
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('[data-cy=focus-select]') as HTMLButtonElement);

    const el = container.querySelector('[data-cy=name]') as HTMLInputElement;
    expect(el.selectionStart).toBe(0);
    expect(el.selectionEnd).toBe(el.value.length);
  });
});
