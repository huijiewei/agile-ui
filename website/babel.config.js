const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  extends: '../babel.config.js',
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: isDevelopment,
        importSource: isDevelopment ? '@welldone-software/why-did-you-render' : 'react',
      },
    ],
  ],
  plugins: [
    ['babel-plugin-optimize-clsx', { libraries: ['twind'], functionNames: ['tx'] }],
    '@babel/plugin-syntax-import-assertions',
    'babel-plugin-react-turbo',
  ],
};
