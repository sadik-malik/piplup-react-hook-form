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

    cy.mount(<TestWrapper />);

    // Submit without input
    cy.get('[data-cy="submit"]').click();

    // Check for validation error (assuming react-hook-form handles required)
    cy.get('[data-cy="error"]').should('exist');
  });
});
