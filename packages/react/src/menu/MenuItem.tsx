import { tx } from 'twind';
import { polymorphicComponent } from '../utils/polymorphic';

type MenuItemProps = { disabled?: boolean };

export const MenuItem = polymorphicComponent<'div', MenuItemProps>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  return (
    <Component ref={ref} className={tx(className, '')} {...rest}>
      {children}
    </Component>
  );
});
