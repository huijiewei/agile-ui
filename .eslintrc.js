module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jsx-a11y'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
      ],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'react/prop-types': 'off',
      },
    },
  ],
};
