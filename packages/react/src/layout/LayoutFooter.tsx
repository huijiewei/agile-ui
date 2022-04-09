import clsx from 'clsx';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';

type LayoutFooterProps = {
  children?: ReactNode;
};

export const LayoutFooter = polymorphicComponent<'footer', LayoutFooterProps>((props, ref) => {
  const { as: Component = 'footer', className, children, ...rest } = props;

  return (
    <Component className={clsx(className)} {...rest} ref={ref}>
      {children}
    </Component>
  );
});
