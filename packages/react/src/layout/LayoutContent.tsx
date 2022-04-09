import clsx from 'clsx';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';

type LayoutContentProps = {
  children?: ReactNode;
};

export const LayoutContent = polymorphicComponent<'main', LayoutContentProps>((props, ref) => {
  const { as: Component = 'main', className, children, ...rest } = props;

  return (
    <Component className={clsx(className)} {...rest} ref={ref}>
      {children}
    </Component>
  );
});
