import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  // Automatically start the local practice API
  webServer: {
    command: 'node practice-api/server.cjs',
    url: 'http://127.0.0.1:5050/health',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },

  testDir: './tests',
globalTimeout: process.env.CI ? 20 * 60 * 1000 : undefined,
  // Store screenshots, videos, and traces
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: [
  ['list'],
  ['html', {
    outputFolder: 'playwright-report',
    open: 'never'
  }],
  ['junit', {
    outputFile: 'reports/junit-results.xml'
  }],
  ['json', {
    outputFile: 'reports/results.json'
  }]
],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
use: {
  // Capture browser screenshots on failure
  screenshot: 'only-on-failure',

  // Retain video recordings of failed tests
  video: 'retain-on-failure',

  // Retain traces of failed tests
  trace: 'retain-on-failure',
},

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
