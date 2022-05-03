import { __DEV__ } from '@agile-ui/utils';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';
import { twClsx } from '../utils/tailwind';

type StackProps = {
  direction?: 'horizontal' | 'vertical';
};

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as, className, children, direction = 'horizontal', ...rest } = props;

  return (
    <Box as={as} {...rest} className={twClsx('flex', className)} ref={ref}>
      {children}
    </Box>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
