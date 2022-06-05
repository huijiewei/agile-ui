import { __DEV__ } from '@agile-ui/utils';
import { Children, forwardRef, SVGAttributes } from 'react';
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
};

export const createIcon = (options: CreateIconOptions) => {
  const { viewBox, d, displayName } = options;

  const path = Children.toArray(options.path);

  const Component = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon viewBox={viewBox} {...props} ref={ref}>
        {path.length ? path : <path fill="currentColor" d={d} />}
      </Icon>
    );
  });

  if (__DEV__) {
    Component.displayName = displayName;
  }

  return Component;
};
