import { __DEV__ } from '@agile-ui/utils';
import { useMemo } from 'react';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';

export type ButtonGroupProps = {
  /**
   * The button's variant.
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'light' | 'subtle' | 'link';

  /**
   * The button's level.
   * @default 'primary'
   */
  level?: 'primary' | 'success' | 'natural' | 'warning' | 'danger';

  /**
   * The button's size.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

export const ButtonGroup = polymorphicComponent<'div', ButtonGroupProps>((props, ref) => {
  const { as: Component = 'div', children, size = 'md', level = 'primary', variant = 'solid', ...rest } = props;

  const context = useMemo(() => ({ size, level, variant }), [size, level, variant]);

  return (
    <ButtonGroupProvider value={context}>
      <Component {...rest} ref={ref}>
        {children}
      </Component>
    </ButtonGroupProvider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
