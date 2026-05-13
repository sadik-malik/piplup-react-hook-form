import * as React from 'react';
import { test, expect, vi, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { useForm, useWatch } from 'react-hook-form';
import { HtmlInputElement } from './element';

describe('HtmlInputElement', () => {
  test('should render and handle input changes', async () => {
    const TestWrapper = () => {
      const { control, handleSubmit } = useForm({
        defaultValues: { test: '' },
      });
      const value = useWatch({
        control,
        name: 'test',
      });

      return (
        <form
          onSubmit={handleSubmit(() => {
            // No-op
          })}
          noValidate
        >
          <HtmlInputElement
            control={control}
            name="test"
            placeholder="Enter text"
            type="text"
            data-testid="input"
          />
          <p data-testid="value-display">Value: {value}</p>
        </form>
      );
    };

    const screen = await render(<TestWrapper />);

    const input = screen.getByTestId('input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter text');

    await input.fill('Hello World');

    await expect(screen.getByTestId('value-display')).toHaveTextContent('Value: Hello World');
  });

  test('should handle required validation', async () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { test: '' },
      });

      return (
        <form
          onSubmit={handleSubmit(() => {
            // No-op
          })}
          noValidate
        >
          <HtmlInputElement control={control} name="test" type="text" required />
          <button data-testid="submit" type="submit">
            Submit
          </button>
          {errors.test && <p data-testid="error">Error: {errors.test.message}</p>}
        </form>
      );
    };

    const screen = await render(<TestWrapper />);
    await screen.getByTestId('submit').click();
    await expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  test('should handle disabled state', async () => {
    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: '' },
      });

      return (
        <div>
          <HtmlInputElement
            data-testid="input"
            control={control}
            name="text"
            type="text"
            disabled
          />
        </div>
      );
    };

    const screen = await render(<TestWrapper />);
    await expect(screen.getByTestId('input')).toBeDisabled();
  });

  test('should handle default value', async () => {
    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: 'default value' },
      });

      return (
        <div>
          <HtmlInputElement control={control} name="text" type="text" data-testid="input" />
        </div>
      );
    };

    const screen = await render(<TestWrapper />);
    await expect(screen.getByTestId('input')).toHaveValue('default value');
  });

  test('should handle controlled value', async () => {
    const TestWrapper = () => {
      const { control, setValue } = useForm({
        defaultValues: { text: '' },
      });

      React.useEffect(() => {
        setValue('text', 'controlled value');
      }, [setValue]);

      return (
        <div>
          <HtmlInputElement control={control} name="text" type="text" data-testid="input" />
        </div>
      );
    };

    const screen = await render(<TestWrapper />);
    await expect(screen.getByTestId('input')).toHaveValue('controlled value');
  });

  test('should call onChange callback', async () => {
    const onChangeSpy = vi.fn();

    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: '' },
      });

      return (
        <div>
          <HtmlInputElement
            control={control}
            data-testid="input"
            name="text"
            onChange={onChangeSpy}
            type="text"
          />
        </div>
      );
    };

    const screen = await render(<TestWrapper />);
    const input = screen.getByTestId('input');
    await input.fill('test');

    await expect(onChangeSpy).toHaveBeenCalled();
  });

  test('should handle transform function', async () => {
    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: '' },
      });
      const value = useWatch({
        control,
        name: 'text',
      });

      return (
        <div>
          <HtmlInputElement
            transform={{
              output(event) {
                return event.target.value.toUpperCase() || '';
              },
            }}
            control={control}
            name="text"
            type="text"
            data-testid="input"
          />
          <p data-testid="value-display">Value: {value}</p>
        </div>
      );
    };

    const screen = await render(<TestWrapper />);
    const input = screen.getByTestId('input');
    await input.fill('hello');

    await expect(screen.getByTestId('value-display')).toHaveTextContent('Value: HELLO');
  });
});
