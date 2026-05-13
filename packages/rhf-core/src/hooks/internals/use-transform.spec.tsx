import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useUnstableTransform as useTransform, type UseTransformProps } from './use-transform';

function Comp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseTransformProps<string, TFieldValues, TName>) {
  const t = useTransform(props);
  return (
    <div>
      <div data-cy="val">{String(t.value)}</div>
      <button data-cy="call" onClick={() => t.onChange('x')}>
        call
      </button>
    </div>
  );
}

describe('useTransform', () => {
  it('applies input transform to value', () => {
    const { container } = render(
      <Comp onChange={() => {}} transform={{ input: (v) => String(v + 1) }} value={1} />,
    );
    expect(container.querySelector('[data-cy=val]')?.textContent).toContain('2');
  });
});
