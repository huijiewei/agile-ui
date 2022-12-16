import type { Rule } from '@twind/core';
import type { TailwindTheme } from '@twind/preset-tailwind';

export default [
  [
    'scrollbar',
    '&::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])',
  ],
  [
    'scrollbar-thin',
    '&::-webkit-scrollbar:(w-[9px] h-[9px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-200 rounded-[5px])',
  ],
] as Rule<TailwindTheme>[];
