import { useMemo } from 'react';
import { tx } from 'twind';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';

type MenuContextValue = {
  mode: 'vertical' | 'horizontal';
};

const [MenuProvider, useMenu] = createContext<MenuContextValue>({
  strict: true,
  name: 'MenuContext',
});

export { useMenu };

type MenuProps = MenuContextValue;

export const Menu = polymorphicComponent<'menu', MenuProps>((props, ref) => {
  const { as: Component = 'menu', className, mode = 'vertical', children, ...rest } = props;

  const menuContextValue = useMemo(() => ({ mode }), [mode]);

  return (
    <Component {...rest} className={tx(className, '')} ref={ref}>
      <MenuProvider value={menuContextValue}>{children}</MenuProvider>
    </Component>
  );
});
