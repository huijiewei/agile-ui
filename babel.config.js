module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    ['@babel/preset-typescript', { allowDeclareFields: true }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
