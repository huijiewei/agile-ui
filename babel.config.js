module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        targets: '> 1%, not dead, not ie 11, not op_mini all',
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
  plugins: [
    '@babel/plugin-transform-runtime',
    process.env.NODE_ENV === 'test' && '@vanilla-extract/babel-plugin',
  ].filter(Boolean),
};
