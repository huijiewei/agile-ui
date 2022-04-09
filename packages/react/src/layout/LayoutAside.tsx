import clsx from 'clsx';
import { ReactNode } from 'react';
import { polymorphicComponent } from '../utils/polymorphic';
type LayoutAsideProps = {
  children?: ReactNode;
};

export const LayoutAside = polymorphicComponent<'aside', LayoutAsideProps>((props, ref) => {
  const { as: Component = 'aside', className, children, ...rest } = props;

  return (
    <Component {...rest} className={clsx(className)} ref={ref}>
      {children}
    </Component>
  );
});
