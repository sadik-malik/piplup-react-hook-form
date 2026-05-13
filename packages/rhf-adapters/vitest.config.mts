import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { playwrightCommands } from 'vitest-browser-commands';

export default defineConfig({
  plugins: [playwrightCommands(), react()],
  test: {
    include: ['src/**/*.spec.{ts,tsx}'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
