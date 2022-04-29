import { __DEV__ } from '@agile-ui/utils';
import clsx from 'clsx';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';

type StackProps = {
  direction?: 'horizontal' | 'vertical';
};

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as, className, children, direction = 'horizontal', ...rest } = props;

  return (
    <Box as={as} {...rest} className={clsx(className, 'flex')} ref={ref}>
      {children}
    </Box>
  );
});

if (__DEV__) {
  Stack.displayName = '@agile-ui/react/Stack';
}
