import { ColorLevel, Size } from '@agile-ui/tokens';
import { __DEV__ } from '@agile-ui/utils';
import { useMemo } from 'react';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';

export type ButtonGroupProps = {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  level?: ColorLevel;
  size?: Size;
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

export const ButtonGroup = polymorphicComponent<'div', ButtonGroupProps>((props, ref) => {
  const { as: Component = 'div', children, size, level, variant, ...rest } = props;

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
