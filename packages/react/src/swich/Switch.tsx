import { __DEV__ } from '@agile-ui/utils';
import { polymorphicComponent } from '../utils/component';
import type { Color, Size } from '../utils/types';

type SwitchProps = {
  color?: Color;
  size?: Size;
};

export const Switch = polymorphicComponent<'input', SwitchProps>((props, ref) => {
  const { color, size, ...rest } = props;
  return (
    <label>
      <input type="checkbox" ref={ref} {...rest} />
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}
