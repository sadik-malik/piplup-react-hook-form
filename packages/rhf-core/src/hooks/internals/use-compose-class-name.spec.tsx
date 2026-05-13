import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import {
  useUnstableComposeClassName as useComposeClassName,
  type UseComposeClassNameProps,
} from './use-compose-class-name';

afterEach(() => {
  // cleanup if needed
});

function Comp(props: UseComposeClassNameProps) {
  const cls = useComposeClassName(props);
  return <div data-cy="cls">{cls || ''}</div>;
}

describe('useComposeClassName', () => {
  it('returns provided className when composeClassName is false', () => {
    const { container } = render(
      <Comp
        classes={{ disabled: 'disabled', error: 'error', root: 'root' }}
        className="base"
        composeClassName={false}
        modifierState={{ disabled: true, error: true }}
      />,
    );
    expect(container.querySelector('[data-cy=cls]')?.textContent).toContain('base');
  });

  it('composes classes from modifierState and classes map', () => {
    const { container } = render(
      <Comp
        classes={{ disabled: 'disabled', error: 'error', root: 'root' }}
        className="extra"
        modifierState={{ disabled: true, error: true }}
        composeClassName
      />,
    );

    const txt = container.querySelector('[data-cy=cls]')?.textContent || '';
    expect(txt).toContain('root');
    expect(txt).toContain('disabled');
    expect(txt).toContain('error');
    expect(txt).toContain('extra');
  });
});
