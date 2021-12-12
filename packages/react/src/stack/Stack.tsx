import { PolymorphicComponentProps } from '../polymorphic/Polymorphic';
import { ElementType, forwardRef, ReactElement } from 'react';
import { __DEV__ } from '@agile-ui/utils';
import { StackVariants, variants } from './Stack.css';

const DEFAULT_TAG = 'div';

type Props = StackVariants;

export type StackProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

type StackComponent = <C extends ElementType = typeof DEFAULT_TAG>(props: StackProps<C>) => ReactElement | null;

export const Stack: StackComponent & { displayName?: string } = forwardRef((props, ref) => {
  const { as: Component = DEFAULT_TAG, children, direction = 'column', ...rest } = props;

  return (
    <Component {...rest} className={variants({ direction })} ref={ref}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
