import { nxComponentTestingPreset } from '@nx/react/plugins/component-testing';
import { defineConfig } from 'cypress';

const preset = nxComponentTestingPreset(__filename, { bundler: 'vite' });

export default defineConfig({
  component: {
    ...preset,
    specPattern: ['src/**/*.spec.{js,jsx,ts,tsx}'],
  },
});
