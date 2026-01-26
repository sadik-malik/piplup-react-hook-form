/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
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
  it('submits form data via onSubmit', () => {
    const onSubmit = cy.stub();

    cy.mount(
      <FormContainer onSubmit={(data) => onSubmit(data)}>
        <Child />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('[data-cy=name]').type('Alice');
    cy.get('button[type=submit]').click();
    cy.then(() => {
      expect(onSubmit).to.have.been.calledWith({ name: 'Alice' });
    });
  });

  it('calls onError when validation fails', () => {
    const onError = cy.stub();

    cy.mount(
      <FormContainer onError={(err) => onError(err)} onSubmit={() => {}}>
        <ChildRequired />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onError.called).to.equal(true);
      const err = onError.getCall(0).args[0];
      expect(err).to.have.property('name');
    });
  });

  it('accepts a provided formContext prop and submits correctly', () => {
    const onSubmit = cy.stub();

    const WithForm = () => {
      const form = useForm();
      return (
        <FormContainer formContext={form} onSubmit={(data) => onSubmit(data)}>
          <Child />
          <button type="submit">Submit</button>
        </FormContainer>
      );
    };

    cy.mount(<WithForm />);

    cy.get('[data-cy=name]').type('Bob');
    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit).to.have.been.calledWith({ name: 'Bob' });
    });
  });

  it('provides the errorParser via context when passed', () => {
    const parser = cy.stub().returns('parsed');

    const ParserConsumer = () => {
      const parse = React.useContext(FormErrorParserContext);
      const [t, setT] = React.useState<null | string>(null);
      React.useEffect(() => {
        if (parse) setT(String(typeof parse));
      }, [parse]);
      return <div data-cy="parser">{t}</div>;
    };

    cy.mount(
      <FormContainer errorParser={parser} onSubmit={() => {}}>
        <ParserConsumer />
      </FormContainer>,
    );

    cy.get('[data-cy=parser]').should('contain', 'function');
  });
});
