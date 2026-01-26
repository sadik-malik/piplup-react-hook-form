import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormContainer } from '@piplup/rhf-core';
import { MuiRadioGroupElement } from './element';

describe('MuiRadioGroupElement', () => {
  it('mounts and allows selecting an option', () => {
    cy.mount(
      <FormContainer>
        <MuiRadioGroupElement name="choice">
          <FormControlLabel
            control={<Radio name="choice" value="a" />}
            label="A"
          />
          <FormControlLabel
            control={<Radio name="choice" value="b" />}
            label="B"
          />
        </MuiRadioGroupElement>
      </FormContainer>,
    );

    cy.get('input[type=radio][value="b"]').click();
    cy.get('input[type=radio][value="b"]').should('be.checked');
  });

  it('honors defaultValue from form', () => {
    cy.mount(
      <FormContainer defaultValues={{ choice: 'a' }}>
        <MuiRadioGroupElement name="choice">
          <FormControlLabel
            control={<Radio name="choice" value="a" />}
            label="A"
          />
          <FormControlLabel
            control={<Radio name="choice" value="b" />}
            label="B"
          />
        </MuiRadioGroupElement>
      </FormContainer>,
    );

    cy.get('input[type=radio][value="a"]').should('be.checked');
  });

  it('forwards the name from adapter when provided via props', () => {
    cy.mount(
      <FormContainer>
        <MuiRadioGroupElement name="my-group">
          <FormControlLabel
            control={<Radio name="my-group" value="x" />}
            label="X"
          />
        </MuiRadioGroupElement>
      </FormContainer>,
    );
    cy.get('input[type=radio]').should('have.attr', 'name', 'my-group');
  });

  it('fires onChange when option changes', () => {
    const onChange = cy.stub();

    cy.mount(
      <FormContainer>
        <MuiRadioGroupElement name="choice" onChange={(e) => onChange(e)}>
          <FormControlLabel
            control={<Radio name="choice" value="a" />}
            label="A"
          />
        </MuiRadioGroupElement>
      </FormContainer>,
    );

    cy.get('input[type=radio]').click();

    cy.then(() => {
      expect(onChange.called).to.equal(true);
    });
  });
});
