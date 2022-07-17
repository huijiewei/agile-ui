import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export const PopoverBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={cx('px-3 py-2', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  PopoverBody.displayName = 'PopoverBody';
}
