module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/', '/.idea/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@agile-ui/(.*?)$': '<rootDir>/packages/$1/src',
  },
};
