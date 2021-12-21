import clsx from 'clsx';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';
import { layoutHeaderClass } from './Layout.css';

type LayoutHeaderProps = {
  children?: ReactNode;
};

export const LayoutHeader = polymorphicComponent<'header', LayoutHeaderProps>((props, ref) => {
  const { as: Component = 'header', className, children, ...rest } = props;

  return (
    <Component className={clsx(className, layoutHeaderClass)} {...rest} ref={ref}>
      {children}
    </Component>
  );
});
