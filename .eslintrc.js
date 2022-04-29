module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['classnames', 'clsx', 'twClsx'],
      officialSorting: true,
      config: './website/tailwind.config.js',
      whitelist: ['(spinner|spinner-empty)-[a-z]+(-[0-9]+)?'],
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
  },
};
