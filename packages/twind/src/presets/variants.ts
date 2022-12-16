import type { Variant } from '@twind/core';
import type { TailwindTheme } from '@twind/preset-tailwind';

export default [
  ['opened', '&[data-opened]'],
  ['active', '&[data-active], &:active'],
  ['disabled', '&[data-loading], &[data-disabled], &[disabled]'],
  ['selected', '&[data-selected]'],
  ['focus-visible', '&[data-focus-visible], &:focus-visible'],
] as Variant<TailwindTheme>[];
