import { css } from '@twind/core';

export default css`
  html {
    color-scheme: light;
  }
  body {
    @apply text-base;
  }
  .dark {
    color-scheme: dark;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
