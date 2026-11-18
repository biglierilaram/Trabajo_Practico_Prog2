const path = require('path');
console.log('Execution dir:', __dirname);
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });
module.exports = {
  automock: false,
  collectCoverage: true,
  coverageProvider: 'v8', //v8 seems to be really precise. and give us more accurate coverage on sonar
  coverageReporters: ["clover", "json", "lcov", ["text", { "skipFull": true }]],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/Tests/**/*.test.ts"],
  testPathIgnorePatterns: [
    "node_modules",
    "Tests/data.ts",
    "Tests/common.mocks.ts",
    "Tests/integ"
  ],
  testTimeout: 22000,
  verbose: false,
  reporters: [
    //"default", 
    ["jest-compact-reporter", { diffs: false, colours: true, showPassingTests: true }],
    ["jest-junit", { outputDirectory: "coverage", usePathForSuiteName: true, reportedFilePath: "absolute" }],
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
  },
};