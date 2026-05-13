import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';
import { FormContainer } from '../form';
import { useFieldStateAdapter, type UseFieldStateAdapterProps } from './use-field-state-adapter';

function AdapterConsumer<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseFieldStateAdapterProps<TFieldValues, TName>) {
  const {
    className,
    disabled,
    error,
    helperText: composedHelperText,
    style: styleOut,
  } = useFieldStateAdapter(props);

  return (
    <p
      aria-disabled={disabled}
      className={className}
      data-cy="helper"
      data-error={error ? 'true' : 'false'}
      style={styleOut}
    >
      {composedHelperText}
    </p>
  );
}

const InputRequired = () => {
  const { register } = useFormContext();
  return <input data-cy="input" {...register('name', { required: true })} />;
};

describe('useFieldStateAdapter', () => {
  it('renders provided helperText', () => {
    const { container } = render(
      <FormContainer>
        <AdapterConsumer helperText="Helpful" name="a" />
      </FormContainer>,
    );

    expect(container.querySelector('[data-cy=helper]')?.textContent).toContain('Helpful');
    expect(container.querySelector('[data-cy=helper]')?.getAttribute('data-error')).toBe('false');
  });

  it('reflects field error when validation fails', async () => {
    const { container } = render(
      <FormContainer onSubmit={() => {}}>
        <InputRequired />
        <AdapterConsumer helperText="Required" name="name" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);
    expect(container.querySelector('[data-cy=helper]')?.getAttribute('data-error')).toBe('true');
  });

  it('applies styles conditionally in case of error', async () => {
    const { container } = render(
      <FormContainer onSubmit={() => {}}>
        <InputRequired />
        <AdapterConsumer
          style={(modifierState) => (modifierState.error ? { color: 'rgb(255, 0, 0)' } : {})}
          helperText="H"
          name="name"
        />
        <button type="submit">Submit</button>
      </FormContainer>,
    );
    await userEvent.click(container.querySelector('button[type=submit]') as HTMLButtonElement);
    const el = container.querySelector('[data-cy=helper]') as HTMLElement;
    expect(getComputedStyle(el).color).toBe('rgb(255, 0, 0)');
  });
});
