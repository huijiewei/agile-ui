module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/', '/.idea/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@agile-ui/(.*?)$': '<rootDir>/packages/$1/src',
  },
  transformIgnorePatterns: ['node_modules/(?!(twind|@twind)/)'],
  setupFilesAfterEnv: ['<rootDir>/packages/test-utils/src/setupTests.ts'],
};
