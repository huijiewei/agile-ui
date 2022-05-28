// enable intellisense

module.exports = {
  presets: [require('@agile-ui/twind/tailwind.config')],
  content: ['../packages/react/src/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './docs/**/*.mdx'],
};
