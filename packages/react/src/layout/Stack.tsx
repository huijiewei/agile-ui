import { __DEV__ } from '@agile-ui/utils';
import { tx } from 'twind';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';

type StackProps = {
  direction?: 'row' | 'col';
};

export const Stack = polymorphicComponent<'div', StackProps>((props, ref) => {
  const { as, className, children, direction = 'row', ...rest } = props;

  return (
    <Box
      as={as}
      {...rest}
      className={tx('flex items-center', direction == 'row' ? 'flex-row space-x-2' : 'flex-col space-y-2', className)}
      ref={ref}
    >
      {children}
    </Box>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}
