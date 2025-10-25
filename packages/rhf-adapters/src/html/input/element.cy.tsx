import * as React from 'react';
import { mount } from 'cypress/react';
import { useForm, useWatch } from 'react-hook-form';
import { HtmlInputElement } from './element';

describe('HtmlInputElement Component Test', () => {
  it('should render and handle input changes', () => {
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
          />
          <p data-cy="value-display">Value: {value}</p>
        </form>
      );
    };

    mount(<TestWrapper />);

    // Check if input is rendered
    cy.get('input')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter text');

    // Type into the input
    cy.get('input').type('Hello World');

    // Verify the value is updated in the form
    cy.get('[data-cy="value-display"]').should(
      'contain.text',
      'Value: Hello World',
    );
  });

  it('should handle required validation', () => {
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
          <HtmlInputElement
            control={control}
            name="test"
            type="text"
            required
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.test && <p data-cy="error">Error: {errors.test.message}</p>}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Submit without input
    cy.get('[data-cy="submit"]').click();

    // Check for validation error (assuming react-hook-form handles required)
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle email validation', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { email: '' },
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
            name="email"
            type="email"
            required
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.email && <p data-cy="error">Error: {errors.email.message}</p>}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type invalid email
    cy.get('input').type('invalid-email');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle minLength validation', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { text: '' },
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
            minLength={5}
            name="text"
            type="text"
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.text && <p data-cy="error">Error: {errors.text.message}</p>}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type short text
    cy.get('input').type('abc');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle maxLength validation', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { text: '' },
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
            maxLength={5}
            name="text"
            type="text"
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.text && <p data-cy="error">Error: {errors.text.message}</p>}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type long text
    cy.get('input').type('abcdefghijk');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle pattern validation', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { code: '' },
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
            name="code"
            pattern="^[A-Z]{3}$"
            type="text"
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.code && <p data-cy="error">Error: {errors.code.message}</p>}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type invalid pattern
    cy.get('input').type('123');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle min validation error', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { number: 0 },
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
            min={10}
            name="number"
            type="number"
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.number && (
            <p data-cy="error">Error: {errors.number.message}</p>
          )}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type number below min
    cy.get('input').type('5');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle max validation error', () => {
    const TestWrapper = () => {
      const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        defaultValues: { number: 0 },
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
            max={100}
            name="number"
            type="number"
          />
          <button data-cy="submit" type="submit">
            Submit
          </button>
          {errors.number && (
            <p data-cy="error">Error: {errors.number.message}</p>
          )}
        </form>
      );
    };

    mount(<TestWrapper />);

    // Type number above max
    cy.get('input').type('150');
    cy.get('[data-cy="submit"]').click();

    // Check for validation error
    cy.get('[data-cy="error"]').should('exist');
  });

  it('should handle disabled state', () => {
    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: '' },
      });

      return (
        <div>
          <HtmlInputElement
            control={control}
            name="text"
            type="text"
            disabled
          />
        </div>
      );
    };

    mount(<TestWrapper />);

    // Check if input is disabled
    cy.get('input').should('be.disabled');
  });

  it('should handle default value', () => {
    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: 'default value' },
      });

      return (
        <div>
          <HtmlInputElement control={control} name="text" type="text" />
        </div>
      );
    };

    mount(<TestWrapper />);

    // Check if input has default value
    cy.get('input').should('have.value', 'default value');
  });

  it('should handle controlled value', () => {
    const TestWrapper = () => {
      const { control, setValue } = useForm({
        defaultValues: { text: '' },
      });

      React.useEffect(() => {
        setValue('text', 'controlled value');
      }, [setValue]);

      return (
        <div>
          <HtmlInputElement control={control} name="text" type="text" />
        </div>
      );
    };

    mount(<TestWrapper />);

    // Check if input has controlled value
    cy.get('input').should('have.value', 'controlled value');
  });

  it('should call onChange callback', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');

    const TestWrapper = () => {
      const { control } = useForm({
        defaultValues: { text: '' },
      });

      return (
        <div>
          <HtmlInputElement
            control={control}
            name="text"
            onChange={onChangeSpy}
            type="text"
          />
        </div>
      );
    };

    mount(<TestWrapper />);

    // Type into input
    cy.get('input').type('test');

    // Check if onChange was called
    cy.get('@onChangeSpy').should('have.been.called');
  });

  it('should handle transform function', () => {
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
          />
          <p data-cy="value-display">Value: {value}</p>
        </div>
      );
    };

    mount(<TestWrapper />);

    // Type lowercase text
    cy.get('input').type('hello');

    // Check if value is transformed to uppercase
    cy.get('[data-cy="value-display"]').should('contain.text', 'Value: HELLO');
  });
});
