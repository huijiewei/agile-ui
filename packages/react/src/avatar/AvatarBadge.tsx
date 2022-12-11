import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';

export const AvatarBadge = primitiveComponent<'span'>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <span
      ref={ref}
      className={cx(
        'absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full',
        className
      )}
      {...rest}
    ></span>
  );
});

AvatarBadge.displayName = 'AvatarBadge';
