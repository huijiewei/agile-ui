module.exports = {
  theme: {
    screens: { mobile: '0', tablet: '768px', laptop: '1024px', desktop: '1280px' },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      blue: {
        50: '#e7f5ff',
        100: '#d0ebff',
        200: '#a5d8ff',
        300: '#74c0fc',
        400: '#4dabf7',
        500: '#339af0',
        600: '#228be6',
        700: '#1c7ed6',
        800: '#1971c2',
        900: '#1864ab',
      },
      green: {
        50: '#ebfbee',
        100: '#d3f9d8',
        200: '#b2f2bb',
        300: '#8ce99a',
        400: '#69db7c',
        500: '#51cf66',
        600: '#40c057',
        700: '#37b24d',
        800: '#2f9e44',
        900: '#2b8a3e',
      },
      red: {
        50: '#fff5f5',
        100: '#ffe3e3',
        200: '#ffc9c9',
        300: '#ffa8a8',
        400: '#ff8787',
        500: '#ff6b6b',
        600: '#fa5252',
        700: '#f03e3e',
        800: '#e03131',
        900: '#c92a2a',
      },
      yellow: {
        50: '#fff9db',
        100: '#fff3bf',
        200: '#ffec99',
        300: '#ffe066',
        400: '#ffd43b',
        500: '#fcc419',
        600: '#fab005',
        700: '#f59f00',
        800: '#f08c00',
        900: '#e67700',
      },
      gray: {
        50: '#f8f9fa',
        100: '#f1f3f5',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#868e96',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
      },
    },
    fontFamily: {
      body: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
      mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace', '!default'],
    },
    fontSize: {
      xs: ['0.50rem', { lineHeight: '1rem' }],
      sm: ['0.75rem', { lineHeight: '1.25rem' }],
      base: ['0.875rem', { lineHeight: '1.5rem' }],
      lg: ['1rem', { lineHeight: '1.75rem' }],
      xl: ['1.5rem', { lineHeight: '1.75rem' }],
    },
    fontWeight: {
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      bold: '600',
    },
    lineHeight: {
      normal: 'normal',
      none: '1',
      shorter: '1.25',
      short: '1.375',
      base: '1.5715',
      tall: '1.625',
      taller: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    borderRadius: {
      none: '0',
      xs: '1px',
      sm: '2px',
      DEFAULT: '4px',
      lg: '6px',
      xl: '8px',
      full: '9999px',
    },
  },
  plugins: [],
};