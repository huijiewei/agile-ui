import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export const AvatarBadge = primitiveComponent<'span'>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <span
      ref={ref}
      className={cx(
        'absolute rounded-full flex items-center justify-center bottom-0 right-0 translate-x-1/4 translate-y-1/4',
        className
      )}
      {...rest}
    ></span>
  );
});

if (__DEV__) {
  AvatarBadge.displayName = 'AvatarBadge';
}
