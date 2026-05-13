import * as React from 'react';
import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import { FormContainer } from '@piplup/rhf-core';
import { MuiFileInputElement } from './element';

describe('MuiFileInputElement', () => {
  test('accepts a single file selection', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiFileInputElement
          name="file"
          slotProps={{
            htmlInput: {
              'data-testid': 'file',
            },
          }}
        />
      </FormContainer>,
    );

    const input = screen.getByTestId('file');
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });

    await input.upload(file);

    const inputElement = (await input.element()) as HTMLInputElement;

    expect(inputElement.files).toHaveLength(1);
    expect(inputElement.files?.[0].name).toBe('test.txt');

    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  test('accepts multiple files when `multiple` is true', async () => {
    const screen = await render(
      <FormContainer onSubmit={() => {}}>
        <MuiFileInputElement
          name="files"
          multiple
          slotProps={{
            htmlInput: {
              'data-testid': 'file',
            },
          }}
        />
      </FormContainer>,
    );

    const input = screen.getByTestId('file');
    const f1 = new File(['one'], 'a.txt', { type: 'text/plain' });
    const f2 = new File(['two'], 'b.txt', { type: 'text/plain' });

    await input.upload([f1, f2]);

    const inputElement = (await input.element()) as HTMLInputElement;
    expect(inputElement.files).toHaveLength(2);
    expect(inputElement.files?.[0].name).toBe('a.txt');
    expect(inputElement.files?.[1].name).toBe('b.txt');

    expect(screen.getByText('2 files')).toBeInTheDocument();
  });
});
