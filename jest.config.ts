import type { Config } from 'jest';
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

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
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};

export default config;