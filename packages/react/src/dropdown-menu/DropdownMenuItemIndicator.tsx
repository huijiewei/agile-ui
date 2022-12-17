import { createContext } from '../utils/context';
import type { PrimitiveComponentProps } from '../utils/component';
import { cx } from '@twind/core';

export type CheckedState = boolean | 'indeterminate';

type DropdownMenuItemIndicatorProps = {
  checked: CheckedState;
};

const [DropdownMenuItemIndicatorProvider, useDropdownMenuItemIndicator] = createContext<DropdownMenuItemIndicatorProps>(
  {
    strict: true,
    name: 'DropdownMenuItemIndicatorContext',
  }
);

export { DropdownMenuItemIndicatorProvider };

export const DropdownMenuItemIndicator = (props: PrimitiveComponentProps<'span'>) => {
  const { className, children, ...rest } = props;
  const context = useDropdownMenuItemIndicator();

  return context.checked ? (
    <span className={cx('', className)} {...rest}>
      {children}
    </span>
  ) : null;
};

DropdownMenuItemIndicator.displayName = 'DropdownMenuItemIndicator';
