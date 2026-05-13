import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  useUnstableComposeStyle as useComposeStyle,
  type UseComposeStyleProps,
} from './use-compose-style';

function Comp(props: UseComposeStyleProps) {
  const s = useComposeStyle(props);
  return <div data-cy="s">{JSON.stringify(s)}</div>;
}

describe('useComposeStyle', () => {
  it('applies style object directly', () => {
    const { container } = render(
      <Comp modifierState={{ disabled: false, error: false }} style={{ color: 'red' }} />,
    );
    expect(container.querySelector('[data-cy=s]')?.textContent).toContain('red');
  });

  it('calls style function with modifierState', () => {
    const { container } = render(
      <Comp
        modifierState={{ disabled: true, error: false }}
        style={(m) => ({ color: m.disabled ? 'gray' : 'blue' })}
      />,
    );
    expect(container.querySelector('[data-cy=s]')?.textContent).toContain('gray');
  });
});
