import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const DropdownMenuGroup = (props: PrimitiveComponentProps) => {
  const { className, children, ...rest } = props;

  return (
    <div role={'group'} className={cx('', className)} {...rest}>
      {children}
    </div>
  );
};

DropdownMenuGroup.displayName = 'DropdownMenuGroup';
