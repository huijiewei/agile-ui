import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge, validators } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  classGroups: {
    spinner: [{ spinner: [validators.isAny] }],
    'spinner-empty': [{ 'spinner-empty': [validators.isAny] }],
  },
});

export const twClsx = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
