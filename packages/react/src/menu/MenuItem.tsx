import clsx from 'clsx';
import { polymorphicComponent } from '../utils/polymorphic';

type MenuItemProps = { disabled?: boolean };

export const MenuItem = polymorphicComponent<'div', MenuItemProps>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  return (
    <Component ref={ref} className={clsx(className, '')} {...rest}>
      {children}
    </Component>
  );
});
