import { __DEV__ } from '@agile-ui/utils';
import { useMemo } from 'react';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';
import { ButtonVariants } from './Button.css';

//type ButtonGroupProps = Pick<ButtonVariants, 'disabled' | 'variant' | 'level' | 'size'>;
type ButtonGroupProps = Omit<ButtonVariants, 'active'>;

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

export const ButtonGroup = polymorphicComponent<'div', ButtonGroupProps>((props, ref) => {
  const { as: Component = 'div', children, size, level, variant, disabled, ...rest } = props;

  const context = useMemo(() => ({ size, level, variant, disabled }), [size, level, variant, disabled]);

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
