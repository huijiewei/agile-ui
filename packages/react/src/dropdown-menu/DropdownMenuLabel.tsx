import { cx } from 'twind';
import type { PrimitiveComponentProps } from '../utils/component';

export const DropdownMenuLabel = (props: PrimitiveComponentProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('w-full text-gray-400 outline-none flex items-center p-1.5 leading-none', className)} {...rest}>
      {children}
    </div>
  );
};

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
