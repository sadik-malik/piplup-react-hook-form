/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiFileInputElement } from './element';

function attachFiles($input: HTMLInputElement, files: File[]) {
  const dataTransfer = new DataTransfer();
  files.forEach((f) => dataTransfer.items.add(f));
  $input.files = dataTransfer.files;
  $input.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('MuiFileInputElement', () => {
  it('accepts a single file selection', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiFileInputElement name="file" />
      </FormContainer>,
    );

    cy.get('input[type="file"]')
      .should('exist')
      .then(($el) => {
        const input = $el[0] as HTMLInputElement;
        const file = new File(['hello'], 'test.txt', { type: 'text/plain' });

        attachFiles(input, [file]);

        expect(input.files).to.have.length(1);
        expect(input.files?.[0].name).to.equal('test.txt');
      });

    cy.contains('test.txt').should('exist');
  });

  it('accepts multiple files when `multiple` is true', () => {
    cy.mount(
      <FormContainer onSubmit={() => {}}>
        <MuiFileInputElement name="files" multiple />
      </FormContainer>,
    );

    cy.get('input[type="file"]')
      .should('exist')
      .then(($el) => {
        const input = $el[0] as HTMLInputElement;
        const f1 = new File(['one'], 'a.txt', { type: 'text/plain' });
        const f2 = new File(['two'], 'b.txt', { type: 'text/plain' });

        attachFiles(input, [f1, f2]);

        expect(input.files).to.have.length(2);
        expect(input.files?.[0].name).to.equal('a.txt');
        expect(input.files?.[1].name).to.equal('b.txt');
      });

    cy.contains('2 files').should('exist');
  });
});
