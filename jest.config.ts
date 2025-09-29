import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      outputPath: '<rootDir>/coverage/test-report/report.html',
      pageTitle: 'Test Report',
      includeFailureMsg: true,
      includeSuiteFailure: true,
    }]
  ]
};

export default config;