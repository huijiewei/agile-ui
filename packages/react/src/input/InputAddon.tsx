import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { polymorphicComponent } from '../utils/component';
import type { InputBaseProps } from './InputGroup';
import { inputSizes } from './inputSizes';

type InputAddonProps = InputBaseProps;

export const InputAddon = polymorphicComponent<'div', InputAddonProps>((props, ref) => {
  const { as: Component = 'div', size = 'md', className, children, ...rest } = props;

  return (
    <Component
      ref={ref}
      className={cx('rounded border !border-gray-200 bg-gray-50 flex items-center', inputSizes[size], className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  InputAddon.displayName = 'InputAddon';
}
