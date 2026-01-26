import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRadioElement } from './element';

describe('MuiRadioElement', () => {
  it('mounts and allows selecting an option', () => {
    cy.mount(
      <FormContainer>
        <div>
          <FormControlLabel
            control={<MuiRadioElement name="choice" value="a" />}
            label="A"
          />
          <FormControlLabel
            control={<MuiRadioElement name="choice" value="b" />}
            label="B"
          />
        </div>
      </FormContainer>,
    );

    cy.get('input[type=radio][value="b"]').click();
    cy.get('input[type=radio][value="b"]').should('be.checked');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ choice: 'a' }}>
        <div>
          <FormControlLabel
            control={<MuiRadioElement name="choice" value="a" />}
            label="A"
          />
          <FormControlLabel
            control={<MuiRadioElement name="choice" value="b" />}
            label="B"
          />
        </div>
      </FormContainer>,
    );

    cy.get('input[type=radio][value="a"]').should('be.checked');
  });

  it('forwards the name from adapter when provided via props', () => {
    const WithName = () => (
      <FormContainer>
        <FormControlLabel
          control={<MuiRadioElement name="my-radio" value="x" />}
          label="X"
        />
      </FormContainer>
    );

    cy.mount(<WithName />);
    cy.get('input[type=radio]').should('have.attr', 'name', 'my-radio');
  });

  it('fires onChange when clicked', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={
            <MuiRadioElement
              name="choice"
              onChange={(e) => onChange(e)}
              value="a"
            />
          }
          label="X"
        />
      </FormContainer>,
    );

    cy.get('input[type=radio]').click();

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });

  it('respects disabled prop', () => {
    cy.mount(
      <FormContainer>
        <FormControlLabel
          control={<MuiRadioElement name="disabled" value="d" disabled />}
          label="Disabled"
        />
      </FormContainer>,
    );

    cy.get('input[type=radio]').should('be.disabled');
  });
});
