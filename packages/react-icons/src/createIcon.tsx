import { __DEV__ } from '@agile-ui/utils';
import { forwardRef, SVGAttributes } from 'react';
import type { ReactElement } from 'react';

type IconProps = SVGAttributes<SVGElement> & { size?: number | string };

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { children, size = '1rem', className, fill = 'none', viewBox = '0 0 24 24', ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      className={className}
      ref={ref}
      viewBox={viewBox}
      {...rest}
    >
      {children}
    </svg>
  );
});

if (__DEV__) {
  Icon.displayName = 'Icon';
}

type CreateIconOptions = {
  viewBox?: string;
  path?: ReactElement | ReactElement[];
  d?: string;
  displayName?: string;
  defaultProps?: IconProps;
};

export const createIcon = (options: CreateIconOptions) => {
  const { viewBox, d, displayName, defaultProps, path } = options;

  const Component = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon viewBox={viewBox} {...defaultProps} {...props} ref={ref}>
        {path ? path : <path fill="currentColor" d={d} />}
      </Icon>
    );
  });

  if (__DEV__) {
    Component.displayName = displayName;
  }

  return Component;
};
