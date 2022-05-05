import { __DEV__ } from '@agile-ui/utils';
import { Box } from '../box/Box';
import { polymorphicComponent } from '../utils/polymorphic';
import { Color, Size } from '../utils/types';

type SwitchProps = {
  color?: Color;
  size?: Size;
};

export const Switch = polymorphicComponent<'input', SwitchProps>((props, ref) => {
  const { color, size, ...rest } = props;
  return (
    <Box>
      <input type="checkbox" ref={ref} {...rest} />
    </Box>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}
