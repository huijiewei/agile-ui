import { __DEV__, Dict } from '@agile-ui/utils';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { sprinkles, Sprinkles } from '../theme/styles/sprinkles.css';
import { polymorphicComponent } from '../utils/polymorphic';

type BoxProps = Sprinkles & {
  children?: ReactNode;
};

export const Box = polymorphicComponent<'div', BoxProps>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  const atomProps: Dict = {};
  const nativeProps: Dict = {};

  for (const key in rest) {
    if (sprinkles.properties.has(key as keyof Sprinkles)) {
      atomProps[key] = rest[key as keyof typeof rest];
    } else {
      nativeProps[key] = rest[key as keyof typeof rest];
    }
  }

  const atomicClasses = sprinkles(atomProps);

  return (
    <Component className={clsx(className, atomicClasses)} ref={ref} {...nativeProps}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Box.displayName = 'Box';
}
