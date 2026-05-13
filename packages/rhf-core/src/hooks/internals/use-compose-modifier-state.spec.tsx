import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  useUnstableComposeModifierState as useComposeModifierState,
  type UseComposeModifierStateProps,
} from './use-compose-modifier-state';

function Comp(props: UseComposeModifierStateProps) {
  const state = useComposeModifierState(props);
  return (
    <div
      data-cy="s"
      data-disabled={state.disabled ? '1' : '0'}
      data-error={state.error ? '1' : '0'}
    />
  );
}

describe('useComposeModifierState', () => {
  it('computes disabled from disabled prop', () => {
    const { container } = render(<Comp disabled />);
    expect(container.querySelector('[data-cy=s]')?.getAttribute('data-disabled')).toBe('1');
  });

  it('disables on error when disableOnError true', () => {
    const { container } = render(<Comp fieldError disableOnError />);
    expect(container.querySelector('[data-cy=s]')?.getAttribute('data-disabled')).toBe('1');
    expect(container.querySelector('[data-cy=s]')?.getAttribute('data-error')).toBe('1');
  });

  it('disables on submitting when disableOnIsSubmitting true', () => {
    const { container } = render(<Comp disableOnIsSubmitting isSubmitting />);
    expect(container.querySelector('[data-cy=s]')?.getAttribute('data-disabled')).toBe('1');
  });
});
