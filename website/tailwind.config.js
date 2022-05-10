module.exports = {
  presets: [require('@agile-ui/react/tailwind.config')],
  content: ['../packages/react/src/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-dot': 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)',
      },
    },
  },
};
