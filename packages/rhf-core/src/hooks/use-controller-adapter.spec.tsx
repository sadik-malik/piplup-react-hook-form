import * as React from 'react';
import {
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { FormContainer } from '../form';
import {
  useControllerAdapter,
  type UseControllerAdapterProps,
} from './use-controller-adapter';

function TestInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerAdapterProps<string, TFieldValues, TName>) {
  const adapter = useControllerAdapter<string, TFieldValues, TName>(props);
  return <input data-cy="field" {...adapter} />;
}

describe('useControllerAdapter (integration)', () => {
  it('binds to the form and submits value', () => {
    const onSubmit = cy.stub();

    cy.mount(
      <FormContainer onSubmit={(d) => onSubmit(d)}>
        <TestInput name="first" />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('[data-cy=field]').type('Alice');
    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit).to.have.been.calledWith({ first: 'Alice' });
    });
  });

  it('reports validation errors via onError when rules fail', () => {
    const onSubmit = cy.stub();
    const onError = cy.stub();

    cy.mount(
      <FormContainer onError={(e) => onError(e)} onSubmit={(d) => onSubmit(d)}>
        <TestInput name="requiredField" rules={{ required: true }} />
        <button type="submit">Submit</button>
      </FormContainer>,
    );

    cy.get('button[type=submit]').click();

    cy.then(() => {
      expect(onSubmit.called).to.equal(false);
      expect(onError.called).to.equal(true);
      const err = onError.getCall(0).args[0];
      expect(err).to.have.property('requiredField');
      expect(err.requiredField).to.have.property('type', 'required');
    });
  });
});
