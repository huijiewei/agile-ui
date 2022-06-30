import type { SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGElement>;

export const Icon = (props: IconProps) => {
  const {
    fill = 'none',
    viewBox = '0 0 24 24',
    stroke = 'currentColor',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    children,
    ...rest
  } = props;

  return (
    <svg
      width={'1rem'}
      height={'1rem'}
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
