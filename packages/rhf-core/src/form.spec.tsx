/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useForm, useFormContext } from 'react-hook-form';
import { FormErrorParserContext } from './context/form-error-parser-context';
import { FormContainer } from './form';

const Child = () => {
  const { register } = useFormContext();
  return <input data-cy="name" {...register('name')} />;
};

const ChildRequired = () => {
  const { register } = useFormContext();
  return <input data-cy="name" {...register('name', { required: true })} />;
};

describe('FormContainer', () => {
  it('submits form data via onSubmit', async () => {
    const onSubmit = vi.fn();

    const { container } = render(
      <FormContainer onSubmit={(data) => onSubmit(data)}>
        <Child />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    const input = container.querySelector('[data-cy="name"]') as HTMLInputElement;
    await userEvent.type(input, 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice' });
  });

  it('calls onError when validation fails', async () => {
    const onError = vi.fn();

    render(
      <FormContainer onError={(err) => onError(err)} onSubmit={() => {}}>
        <ChildRequired />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    expect(err).toHaveProperty('name');
  });

  it('accepts a provided formContext prop and submits correctly', async () => {
    const onSubmit = vi.fn();

    const WithForm = () => {
      const form = useForm();
      return (
        <FormContainer formContext={form} onSubmit={(data) => onSubmit(data)}>
          <Child />
          <button type="submit">Submit</button>
        </FormContainer>
      );
    };

    const { container } = render(<WithForm />);

    const input = container.querySelector('[data-cy="name"]') as HTMLInputElement;
    await userEvent.type(input, 'Bob');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Bob' });
  });

  it('provides the errorParser via context when passed', async () => {
    const parser = vi.fn().mockReturnValue('parsed');

    const ParserConsumer = () => {
      const parse = React.useContext(FormErrorParserContext);
      const [t, setT] = React.useState<null | string>(null);
      React.useEffect(() => {
        if (parse) setT(String(typeof parse));
      }, [parse]);
      return <div data-cy="parser">{t}</div>;
    };

    render(
      <FormContainer errorParser={parser} onSubmit={() => {}}>
        <ParserConsumer />
      </FormContainer>,
    );

    const parserEl = await screen.findByText(/function/);
    expect(parserEl).toBeTruthy();
  });
});
