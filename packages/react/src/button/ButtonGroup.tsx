import { __DEV__ } from '@agile-ui/utils';
import { useMemo } from 'react';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/component';
import type { Size, Color } from '../utils/types';

export type ButtonBaseProps = {
  /**
   * 形式
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'light' | 'subtle' | 'link';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: Color;

  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupProps = ButtonBaseProps & {
  vertical?: boolean;
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

export const ButtonGroup = polymorphicComponent<'div', ButtonGroupProps>((props, ref) => {
  const { as: Component = 'div', children, size = 'md', color = 'blue', variant = 'solid', ...rest } = props;

  const context = useMemo(() => ({ size, color, variant }), [size, color, variant]);

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
