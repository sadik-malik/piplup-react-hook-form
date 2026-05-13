import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { FormContainer } from '../form';
import { useControllerAdapter, type UseControllerAdapterProps } from './use-controller-adapter';

function TestInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerAdapterProps<string, TFieldValues, TName>) {
  const adapter = useControllerAdapter<string, TFieldValues, TName>(props);
  const { name, value, onChange, onBlur, ref, disabled, required, className, style, title } =
    adapter;

  return (
    <input
      data-cy="field"
      name={name}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref as any}
      disabled={disabled}
      required={required}
      className={className}
      style={style}
      title={title}
    />
  );
}

describe('useControllerAdapter (integration)', () => {
  it('binds to the form and submits value', async () => {
    const onSubmit = vi.fn();

    const { container } = render(
      <FormContainer onSubmit={(d) => onSubmit(d)}>
        <TestInput name="first" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    const field = container.querySelector('[data-cy=field]') as HTMLInputElement;
    await userEvent.type(field, 'Alice');
    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);

    expect(onSubmit).toHaveBeenCalledWith({ first: 'Alice' });
  });

  it('reports validation errors via onError when rules fail', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();

    const { container } = render(
      <FormContainer onError={(e) => onError(e)} onSubmit={(d) => onSubmit(d)}>
        <TestInput name="requiredField" rules={{ required: true }} />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    expect(err).toHaveProperty('requiredField');
    expect(err.requiredField).toHaveProperty('type', 'required');
  });
});
