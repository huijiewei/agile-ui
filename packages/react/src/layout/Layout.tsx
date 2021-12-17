import clsx from 'clsx';
import { polymorphicComponent } from '../utils/polymorphic';
import { layoutRecipe } from './Layout.css';

type LayoutProps = {
  hasAside?: boolean;
};

export const Layout = polymorphicComponent<'section', LayoutProps>((props, ref) => {
  const { as: Component = 'section', children, className, hasAside = false, ...rest } = props;

  return (
    <Component {...rest} className={clsx(className, layoutRecipe({ hasAside }))} ref={ref}>
      {children}
    </Component>
  );
});
