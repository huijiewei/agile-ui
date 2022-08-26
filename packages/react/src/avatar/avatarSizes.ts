import type { NumberSize } from '../utils/types';
import { isNumber } from '@agile-ui/utils';

const avatarSizeStyles = {
  xs: '4',
  sm: '7',
  md: '10',
  lg: '14',
  xl: '20',
};

export const avatarSizes = (size: NumberSize) => {
  if (isNumber(size)) {
    return `w-[${size}px] h-[${size}px] text-[calc(${size}px/3)]`;
  }

  const sizeNumber = avatarSizeStyles[size];

  return `h-${sizeNumber} w-${sizeNumber} text-[calc(theme(height.${sizeNumber})/3)]`;
};
