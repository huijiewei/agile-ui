import { isNumber } from '@agile-ui/utils';
import type { SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGElement> & { size?: number | string };

export const Icon = (props: IconProps) => {
  const {
    fill = 'none',
    viewBox = '1 1 22 22',
    stroke = 'currentColor',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    children,
    className = '',
    size = '1em',
    ...rest
  } = props;

  const sizeClassName = isNumber(size) ? `h-${size} w-${size}` : `h-[${size}] w-[${size}]`;

  return (
    <svg
      className={`${sizeClassName} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      {...rest}
    >
      {children}
    </svg>
  );
};
