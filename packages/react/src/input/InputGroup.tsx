import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export type InputGroupProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export const InputGroup = primitiveComponent<'div', InputGroupProps>((props, ref) => {
  const { className, size, children, ...rest } = props;

  return (
    <div ref={ref} className={cx('w-full relative flex', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}
